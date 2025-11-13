import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiError } from "./utils/ApiError.js";

const allowedOrigins = [
  process.env.CLIENT_ORIGIN_LOCAL,
  process.env.CLIENT_ORIGIN_PROD,
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import chatRouter from "./routes/chat.routes.js";
import cartRouter from "./routes/cart.route.js";
import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error caught by middleware:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;

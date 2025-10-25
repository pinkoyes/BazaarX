import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

export default app;

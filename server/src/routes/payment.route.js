import express from "express";
import { verifyPayment } from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/verify", protect, verifyPayment);

export default router;

import express from "express";
import {
  placeOrder,
  buyerOrders,
  sellerOrders,
  OrderStatus,
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/buyer", protect, buyerOrders);
router.get("/seller", protect, sellerOrders);
router.patch("/:id/status", protect, OrderStatus);

export default router;

import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  placeOrder,
  myOrders,
  sellerOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, myOrders);
router.get("/seller-orders", protect, sellerOrders);
router.patch("/update/:orderId", protect, updateOrderStatus);

export default router;

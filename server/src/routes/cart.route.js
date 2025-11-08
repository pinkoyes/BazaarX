import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  myCart,
  removeCart,
  updateCartItemQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/my", protect, myCart);
router.delete("/remove/:productId", protect, removeCart);
router.patch("/update", protect, updateCartItemQuantity);

export default router;

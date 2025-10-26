import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  fetchUserProducts,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", protect, upload.array("media", 5), createProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.get("/user/:id", protect, fetchUserProducts);
router.patch("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;

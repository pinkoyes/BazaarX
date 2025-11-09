import express from "express";
import {
  userInfo,
  updateUserInfo,
  deleteUserAccount,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/info", protect, userInfo);
router.patch("/update", protect, upload.single("profileImage"), updateUserInfo);
router.delete("/delete", protect, deleteUserAccount);

export default router;

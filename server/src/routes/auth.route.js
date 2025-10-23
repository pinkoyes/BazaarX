import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  RefreshToken,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("refresh-token", RefreshToken);
router.post("/logout", protect, LogoutUser);

export default router;

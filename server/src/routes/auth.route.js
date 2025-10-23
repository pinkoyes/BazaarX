import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  CurrentUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", protect, LogoutUser);
router.get("/me", protect, CurrentUser);

export default router;

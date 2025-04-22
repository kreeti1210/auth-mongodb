import express from "express";
import {
  registerUser,
  verifyUser,
  login,
  getMe,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login",login);
router.get("/me", isLoggedIn, getMe); //event driven programming only when url is hit then it happens
router.get("/logout",isLoggedIn, logoutUser);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:token",resetPassword)
export default router;

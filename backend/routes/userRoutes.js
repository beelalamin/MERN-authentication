import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);

router.post("/auth", authUser);

router.post("/logout", LogoutUser);

//router.get("/profile", getUserProfile);

//router.put("/profile", updateUserProfile);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;

import express from "express";
import { login, verify } from "../controllers/authController.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

// Define the login route
router.post("/login", login);

// Define the route to verify user authentication
router.get("/verify", verifyUser, verify);

export default router;

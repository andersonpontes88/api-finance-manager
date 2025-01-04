import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Rota de Registro
router.post("/register", registerUser);

// Rota de Login
router.post("/login", loginUser);

export default router;

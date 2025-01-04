import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// authenticate é um middleware que protege as rotas

// Rota para criar uma nova transação
router.post("/", authenticate, createTransaction);

// Rota para obter todas as transações do usuário
router.get("/", authenticate, getTransactions);

// Rota para atualizar uma transação existente
router.put("/:id", authenticate, updateTransaction);

// Rota para deletar uma transação
router.delete("/:id", authenticate, deleteTransaction);

export default router;

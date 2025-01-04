import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Middleware para habilitar CORS (comunicação entre front e back)
app.use(
  cors({
    origin: " http://localhost:5173", // Permita requisições deste domínio
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true, // Permitir envio de cookies
  })
);

// Rotas
app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

// Conectar ao MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
};

// Rota inicial para testar o servidor
app.get("/", (req, res) => {
  res.send("Bem-vindo à API do Gerenciador de Finanças!");
});

// Inicializar o servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  connectToDatabase();
});

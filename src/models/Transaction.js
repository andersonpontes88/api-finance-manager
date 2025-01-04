import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"], // income = receita, expense = despesa
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;

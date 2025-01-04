import Transaction from "../models/Transaction.js";

// Criar uma nova transação
export const createTransaction = async (req, res) => {
  const { type, amount, category, userId } = req.body;

  try {
    const transaction = new Transaction({ type, amount, category, userId });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error });
  }
};

// Obter todas as transações de um usuário
export const getTransactions = async (req, res) => {
  const { userId } = req.query;

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações", error });
  }
};

// Atualizar uma transação existente
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, amount, category } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, amount, category },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar transação", error });
  }
};

// Deletar uma transação
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    res.status(200).json({ message: "Transação deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar transação", error });
  }
};

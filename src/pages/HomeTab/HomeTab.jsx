import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionsList from "../../components/TransactionsList/TransactionsList";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import {
  addTransaction,
  fetchTransactions,
  transactionCategories,
} from "../../redux/transactions/operations";
import { FaPlus } from "react-icons/fa";
import css from "./HomeTab.module.css";

export default function HomeTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.transactions.categories);
  // console.log("Categories:", categories);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(transactionCategories());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTransaction = async (transactionData) => {
    try {
      await dispatch(addTransaction(transactionData)).unwrap();
      closeModal();
    } catch (err) {
      console.error("Transaction eklenemedi:", err);
    }
  };

  return (
    <div>
      <h1>Home Tab</h1>
      <TransactionsList />
      <button onClick={openModal} className={css.fab} aria-label="Add transaction"><FaPlus size={18} color="white" /></button>
      <ModalAddTransaction
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddTransaction}
        categories={categories}
      />
    </div>
  );
}

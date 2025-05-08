import { useState } from "react";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/selectors";
import css from "./TransactionsItem.module.css";
import { GoPencil } from "react-icons/go";
import { useMediaQuery } from "react-responsive";

const reverseDate = (date) => {
  const [year, month, day] = date.split("-"); // Tarihi parçalara ayır
  return `${day}.${month}.${year}`; // Tersten sıraya koy
};

const getCategoryName = (categoryId, categories) => {
  const category = categories.find((cat) => cat.id === categoryId); // Kategori ID'sine göre bulma
  return category ? category.name : "Unknown";
};

const TransactionsItem = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.transactions.isLoading);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  const reversedDate = reverseDate(transaction.transactionDate);
  const categories = useSelector(selectCategories);

  const amountClass = transaction.amount > 0 ? css.positive : css.negative;

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile ? (
    <div
      className={`${css.transactionCard} ${
        transaction.type === "INCOME" ? css.income : css.expense
      }`}
    >
      <div className={css.cardRow}>
        <span className={css.label}>Date</span>
        <span>{reversedDate}</span>
      </div>
      <div className={css.cardRow}>
        <span className={css.label}>Type</span>
        <span>{transaction.type === "EXPENSE" ? "-" : "+"}</span>
      </div>
      <div className={css.cardRow}>
        <span className={css.label}>Category</span>
        <span>{getCategoryName(transaction.categoryId, categories)}</span>
      </div>
      <div className={css.cardRow}>
        <span className={css.label}>Comment</span>
        <span>{transaction.comment}</span>
      </div>
      <div className={css.cardRow}>
        <span className={css.label}>Sum</span>
        <span className={`${css.transactionAmount} ${amountClass}`}>
          {transaction.amount}
        </span>
      </div>
      <div className={css.buttonsmodal}>
      <button
          onClick={handleDelete}
          disabled={isLoading}
          className={css.deleteButton}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <button onClick={openModal} className={css.editButton}>
          <GoPencil />
        </button>
       
      </div>

      {isModalOpen && (
        <ModalEditTransaction
          transaction={transaction}
          onClose={closeModal}
          openModal={isModalOpen}
          closeModal={closeModal}
          isOpen={isModalOpen}
        />
      )}
    </div>
  ) : (
    <>
      <tr>
        <td>{reversedDate}</td>
        <td>{transaction.type === "EXPENSE" ? "-" : "+"}</td>
        <td>{getCategoryName(transaction.categoryId, categories)}</td>
        <td>{transaction.comment}</td>
        <td className={`${css.transactionAmount} ${amountClass}`}>
          {transaction.amount}
        </td>
        <td className={css.buttons}>
          <button onClick={openModal} className={css.editButton}>
            <GoPencil />
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={css.deleteButton}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <tr>
          <td colSpan="6">
            <ModalEditTransaction
              transaction={transaction}
              onClose={closeModal}
              openModal={isModalOpen}
              closeModal={closeModal}
              isOpen={isModalOpen}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default TransactionsItem;

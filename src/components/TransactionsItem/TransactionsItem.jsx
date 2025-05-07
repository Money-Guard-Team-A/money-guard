import { useState } from "react";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/selectors";


const reverseDate = (date) => {
  const [year, month, day] = date.split("-"); // Tarihi parçalara ayır
  return `${day}.${month}.${year}`; // Tersten sıraya koy
};

const getCategoryName = (categoryId, categories) => {
  const category = categories.find((cat) => cat.id === categoryId); // Kategori ID'sine göre bulma
  return category ? category.name : "Unknown"; // Eğer kategori varsa ismini döndür, yoksa "Unknown" döndür
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

  return (
    <>
      <tr>
        <td>{reversedDate}</td>
        <td>{transaction.type}</td>
        <td>{getCategoryName(transaction.categoryId, categories)}</td>
        <td>{transaction.comment}</td>
        <td>{transaction.amount}</td>
        <td>
          <button onClick={openModal}>Edit</button>
          <button onClick={handleDelete} disabled={isLoading}>
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

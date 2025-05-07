import { useSelector } from "react-redux";
import {
  selectTransactions,
  selectIsLoading,
  selectError,
} from "../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { useState } from "react";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions) || [];
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Comment</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <TransactionsItem
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>

          {/* Modal dışarıda, table yapısının dışında! */}
          {isModalOpen && selectedTransaction && (
            <ModalEditTransaction
              isOpen={isModalOpen}
              transaction={selectedTransaction}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TransactionsList;

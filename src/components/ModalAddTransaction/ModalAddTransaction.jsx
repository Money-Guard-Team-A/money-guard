import React from "react";
import Modal from "react-modal";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import css from "./ModalAddTransaction.module.css";
Modal.setAppElement('#root');

const ModalAddTransaction = ({ onClose, isOpen, onSubmit, categories}) => {
  return (
    <div>
      <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  className={css.modalAddTransaction}
  overlayClassName={css.overlay}
  shouldCloseOnOverlayClick={true}
>

  <AddTransactionForm
    onClose={onClose}
    onSubmit={onSubmit}
    categories={categories}
  />
</Modal>
    </div>
  );
};

export default ModalAddTransaction;

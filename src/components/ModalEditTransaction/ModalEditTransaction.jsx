import React from "react";
import Modal from "react-modal";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import css from "./ModalEditTransaction.module.css";

const ModalEditTransaction = ({ onClose, openModal, transaction }) => {
  if (!openModal) return null;

  return (
    <div>
      <Modal
        isOpen={openModal}  
        onRequestClose={onClose}
        className={css.modalEditTransaction}
        overlayClassName={css.overlay}
        shouldCloseOnOverlayClick={true}
      >
        <EditTransactionForm onClose={onClose} transaction={transaction} />
      </Modal>
    </div>
  );
};

export default ModalEditTransaction;
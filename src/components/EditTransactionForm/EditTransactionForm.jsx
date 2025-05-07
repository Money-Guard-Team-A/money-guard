import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { updateTransaction } from "../../redux/transactions/operations";
import Icon from "../../assets/Icons";
import css from "./EditTransactionForm.module.css";

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  comment: yup.string().max(100, "Comment must be less than 100 characters"),
});

const EditTransactionForm = ({ onClose, transaction }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      amount: transaction?.amount || "",
      comment: transaction?.comment || "",
    },
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (transaction) {
      setValue("amount", transaction.amount);
      setValue("comment", transaction.comment || "");
      setSelectedDate(
        transaction.date && !isNaN(new Date(transaction.date))
          ? new Date(transaction.date)
          : new Date()
      );
    }
  }, [transaction, setValue]);

  const onSubmit = (data) => {
    if (!transaction?.id) {
      console.error("Transaction ID is missing.");
      return;
    }

    const updatedTransaction = {
      type: transaction.type,
      amount: Number(data.amount),
      comment: data.comment,
      ...(transaction.type === "expense"
        ? { category: transaction.category }
        : {}),
    };

    dispatch(
      updateTransaction({
        transactionId: transaction.id,
        transaction: updatedTransaction,
      })
    );

    onClose();
  };

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2 className={css.title}>Edit Transaction</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <span className={css.label}>Type:</span>
            <span>{transaction.type}</span>
          </div>

          {transaction.type === "expense" && (
            <div>
              <span className={css.label}>Category:</span>
              <span>{transaction.category}</span>
            </div>
          )}

          <input
            {...register("amount")}
            type="number"
            className={css.modalAmountInput}
            placeholder="0.00"
          />
          {errors.amount && (
            <p className={css.error}>{errors.amount.message}</p>
          )}

          <div className={css.dateInput}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className={css.modalDatePicker}
              dateFormat="yyyy-MM-dd"
            />
            <Icon id="#icon-calendar" />
          </div>

          <input
            {...register("comment")}
            type="text"
            className={css.modalCommentInput}
            placeholder="Comment"
          />
          {errors.comment && (
            <p className={css.error}>{errors.comment.message}</p>
          )}

          <div className={css.buttons}>
            <button type="submit" className={css.modalSaveButton}>
              SAVE
            </button>
            <button
              type="button"
              onClick={onClose}
              className={css.modalCancelButton}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionForm;

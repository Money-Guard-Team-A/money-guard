import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/transactions/selectors";
import { RiCalendar2Fill } from "react-icons/ri";
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

  const [date, setDate] = useState(new Date(transaction.transactionDate));
  const categories = useSelector(selectCategories);
  const category = categories.find((cat) => cat.id === transaction.categoryId);

  useEffect(() => {
    if (transaction) {
      setValue("amount", transaction.amount);
      setValue("comment", transaction.comment || "");
      setDate(
        transaction.date && !isNaN(new Date(transaction.date))
          ? new Date(transaction.date)
          : new Date()
      );
    }
  }, [transaction, setValue]);

  const onSubmit = async (data) => {
    if (!transaction?.id) {
      console.error("Transaction ID is missing.");
      return;
    }

    const updatedTransaction = {
      type: transaction.type,
      amount: Number(data.amount),
      comment: data.comment,
       transactionDate: date.toISOString(),
      ...(transaction.type === "EXPENSE"
  ? { categoryId: transaction.categoryId }
  : {}),
    };

    try {
    await dispatch(
      updateTransaction({
        transactionId: transaction.id,
        transaction: updatedTransaction,
      })
    );

    onClose();
    // ✅ Güncelleme tamamlandıktan sonra sayfayı yenile
    window.location.reload();
  } catch (error) {
    console.error("Failed to update transaction:", error);
  }
};

  return (
    <div className={css.editModalForm}>
        <div className={css.modalHeader}>
                <h2 className={css.modalTitle}>Edit Transaction</h2>
                <button onClick={onClose} className={css.modalCloseButton}>
                    ✖
                  </button>
        </div>
  
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.toggleEditContainer}>
          <span className={`${css.toggleEditLabel} ${transaction.type === "INCOME" ? css.activeIncome : css.inactive}`}
    >
      Income
            </span>
            <span className={css.labelSymbol}>/</span>
    <span className={`${css.toggleEditLabel} ${transaction.type === "EXPENSE" ? css.activeExpense : css.inactive}`}
    >
      Expense
    </span>
        </div>

        <div className={css.selectCategoryInput}>
        {transaction.type === "EXPENSE" && (
      <span className={css.selectEditCategory}>
        {category ? category.name : "Category"}
      </span>
      )}
        </div>

          <div className={css.inputEditRow}>
          <div className={css.inputEditWrapper}>
          <input
            {...register("amount")}
            type="number"
            className={css.inputEditNumber}
            placeholder="0.00"
            inputMode="decimal"
          />
          {errors.amount && (<p className={css.error}>{errors.amount.message}</p>)}
            </div>
          
          <div className={css.inputEditDateWrapper}>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className={css.modalDatePicker}
                dateFormat="dd.MM.yyyy"
                customInput={
          <input
            type="text" className={css.inputEditDate}
          />
        }
            />
            <RiCalendar2Fill className={css.modalEditDateIcon} />
            </div>
          </div>

          <input
            {...register("comment")}
            type="text"
            className={css.inputEditComment}
            placeholder="Comment"
          />
          {errors.comment && (<p className={css.error}>{errors.comment.message}</p>)}

          <div className={css.buttonGroup}>
            <button type="submit" className={css.modalSaveButton}>SAVE</button>
            <button type="button" onClick={onClose} className={css.modalCancelButton}>CANCEL</button>
          </div>
        </form>
    </div>
  );
};

export default EditTransactionForm;

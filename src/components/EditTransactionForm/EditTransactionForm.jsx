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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const categories = useSelector(selectCategories);
  const category = categories.find((cat) => cat.id === transaction.categoryId);

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
      <span className={css.selectCategory}>
        {category ? category.name : "Category"}
      </span>
      )}
        </div>

          <div className={css.inputEditRow}>
          <div className={css.inputWrapper}>
          <input
            {...register("amount")}
            type="number"
            className={css.inputEditNumber}
            placeholder="0.00"
            inputMode="decimal"
          />
          {errors.amount && (<p className={css.error}>{errors.amount.message}</p>)}
            </div>
          
          <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '20px' }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className={css.modalDatePicker}
                dateFormat="dd.MM.yyyy"
                customInput={
          <input
            type="text"
            style={{
              paddingRight: '10px',
              paddingLeft: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
              fontWeight: '400',
              fontSize: '16px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.4)',
            }}
          />
        }
            />
            <RiCalendar2Fill 
                    style={{
                      position: 'absolute',
                      top: '30%',
                      right: '50px',
                      transform: 'translateY(-50%)',
                      fontSize: '22px',
                      color: '#734AEF',
                      display: 'inline-block',
                    }} 
                  />
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

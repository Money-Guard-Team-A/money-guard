import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectCategories } from "../../redux/transactions/selectors";
import css from "./AddTransactionForm.module.css";
import { RiCalendar2Fill } from "react-icons/ri";

const getValidationSchema = (isIncome) =>
  Yup.object().shape({
    category: Yup.string().nullable(),
    amount: Yup.number()
      .typeError("Amount must be a number.")
      .required("Please enter an amount.")
      .test(
        "amount-sign",
        isIncome
          ? "Amount must be positive."
          : "Expense amount should be negative.",
        (value) => {
          if (typeof value !== "number") return false;
          return isIncome ? value > 0 : value < 0;
        }
      ),
    comment: Yup.string().required("Please add a comment."),
  });

const AddTransactionForm = ({ onClose, onSubmit }) => {
  const [isIncome, setIsIncome] = useState(true);
  const [date, setDate] = useState(new Date());
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getValidationSchema(isIncome)),
    defaultValues: {
      category: "",
      amount: "",
      comment: "",
    },
  });

  const handleFormSubmit = (data) => {
    if (!isIncome && !data.category) {
      alert("Please select a category.");
      return;
    }

    const selectedCategory = isIncome
      ? categories.find((cat) => cat.type === "INCOME")
      : categories.find((cat) => cat.id === data.category);

    if (!selectedCategory) {
      alert("Category not found.");
      return;
    }

    let amount = parseFloat(data.amount);
    if (isIncome && amount < 0) amount = Math.abs(amount);
    if (!isIncome && amount > 0) amount = -amount;

    const transactionData = {
      transactionDate: date.toISOString(),
      type: isIncome ? "INCOME" : "EXPENSE",
      amount,
      comment: data.comment,
      categoryId: selectedCategory.id,
    };

    onSubmit(transactionData);
    reset();
  };

  useEffect(() => {
    reset({}, { keepValues: true, keepErrors: true, keepDirty: true });
  }, [isIncome, reset]);

  const expenseCategories = categories?.filter((cat) => cat.type === "EXPENSE");

  return (
    <form className={css.addModalForm} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={css.modalHeader}>
        <h2 className={css.modalTitle}>Add Transaction</h2>
        <button onClick={onClose} className={css.modalCloseButton}>
            ✖
          </button>
      </div>
      <div className={css.toggleContainer}>
        <span className={`${css.toggleLabel} ${isIncome ? css.activeIncome : css.inactive}`}>Income</span>
              <label className={css.switch}>
                  <input
                      className={css.checkbox}
                      type="checkbox"
                      checked={isIncome}
                      onChange={() => setIsIncome(!isIncome)}
                  />
                  <span className={css.slider}>
                      <span className={`${css.sliderCircle} ${isIncome ? css.income : css.expense}`}>
                          <span className={css.symbol}>{isIncome ? "+" : "-"}</span> 
                      </span>
                  </span>
              </label>
              <span className={`${css.toggleLabel} ${!isIncome ? css.activeExpense : css.inactive}`}>Expense</span>
          </div>

      <div className={css.inputBlocks}>
      {!isIncome && (
        <div className={css.categoryInput}>
          <select className={css.select} {...register("category")}>
            <option className={css.optionDisabled} value="">Select a category</option>
            {expenseCategories.map((cat) => (
              <option className={css.option} key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>
      )}

      <div className={css.inputRow}>
        <div className={css.inputWrapper}>
          <input {...register("amount")} type="number" placeholder="0.00" className={css.inputNumber}/>
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>
        
        <div style={{ position: 'relative', display: 'inline-block', paddingLeft: '20px', paddingTop: '1px' }}>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="dd.MM.yyyy"
        customInput={
          <input
            type="text"
            style={{
              paddingRight: '10px',
              paddingLeft: '30px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
              fontWeight: '400',
              fontSize: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
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

      <input {...register("comment")} className={css.inputComment} type="text" placeholder="Comment" />
      {errors.comment && <p>{errors.comment.message}</p>}

      <div className={css.buttonGroup}>
        <button type="submit" className={css.addBtn}>ADD</button>
        <button onClick={onClose} type="button" className={css.cancelBtn}>CANCEL</button>
      </div>
      </div>
    </form>
  );
};


export default AddTransactionForm;
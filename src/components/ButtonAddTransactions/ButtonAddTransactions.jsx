import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
import { addTransaction, transactionCategories } from "../../redux/transactions/operations";
import css from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await dispatch(transactionCategories()).unwrap();
                const categoryMap = result.reduce((acc, category) => {
                    acc[category.name] = category.id;
                    return acc;
                }, {});
                setCategories(categoryMap);
            } catch (error) {
                console.error("Kategoriler alınamadı:", error);
            }
        };
        fetchCategories();
    }, [dispatch]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const submitHandler = async (transactionData) => {
        try {
            const dataFormatted = {
  date: transactionData.date,
  type: transactionData.type.toUpperCase(),
  comment: transactionData.comment,
  amount:
    transactionData.type === "income"
      ? transactionData.amount.toString()
      : `-${transactionData.amount.toString()}`,
  ...(transactionData.type === "expense" && {
    categoryId: categories[transactionData.category],
  }),
};

            await dispatch(addTransaction(dataFormatted)).unwrap();
            handleCloseModal();
        } catch (error) {
            console.log("İşlem ekleme sırasında bir hata oluştu:", error);
        }
    };

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className={css.addTransactionButton}
            >
                <span className={css.plusButton}>+</span>
            </button>

            {isModalOpen && (
            <ModalAddTransaction
                onSubmit={submitHandler}
                    onClose={handleCloseModal}
                    categories={categories}
            />
            )}
        </div>
    )
};

export default ButtonAddTransactions;

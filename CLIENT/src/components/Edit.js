import React, { useState, useMemo } from "react";
import "./Edit.scss";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_MODAL,
  TOGGLE_FLAG,
  TOGGLE_SAVINGS_FLAG,
  TOGGLE_SIM_FLAG,
} from "../actionTypes";
import FieldContainer from "./FieldContainer";
import { useTranslation } from "react-i18next";

const Edit = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");

  const [isOpen, setIsOpen] = useState(false);

  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const id = props.id;

  // INPUT STATE
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [amount, setAmount] = useState(props.amount);
  const [deadline, setDeadline] = useState(props.deadline);
  const [price, setPrice] = useState(props.price);

  // ERRORS STATE

  const [titleError, setTitleError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [priceError, setPriceError] = useState("");

  // OPEN / CLOSE MODAL
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    dispatch({
      type: TOGGLE_MODAL,
    });
  };

  // FETCH API FUNCTION

  const editAPI = () => {
    const incomeToEdit = {
      title,
      description,
      amount: parseInt(amount),
    };

    const expenseToEdit = {
      title,
      description,
      amount: parseInt(amount),
      deadline,
    };

    const savingsGoalToEdit = {
      title,
      description,
      amount: parseInt(amount),
      price: parseInt(price),
      deadline,
    };

    const simIncomes = JSON.parse(localStorage.getItem("simIncomes"));
    const simExpenses = JSON.parse(localStorage.getItem("simExpenses"));

    // CASES
    // SIMULATOR
    if (props.type === "income-sim") {
      let selectedIncome = simIncomes.find((item) => item.id === props.id);
      selectedIncome.title = title;
      selectedIncome.description = description;
      selectedIncome.amount = parseInt(amount);
      localStorage.setItem("simIncomes", JSON.stringify(simIncomes));

      setTimeout(() => {
        toggleOpen();
        dispatch({
          type: TOGGLE_SIM_FLAG,
        });
      }, 50);
    } else if (props.type === "expense-sim") {
      let selectedExpense = simExpenses.find((item) => item.id === props.id);
      selectedExpense.title = title;
      selectedExpense.description = description;
      selectedExpense.amount = parseInt(amount);
      selectedExpense.deadline = deadline;
      localStorage.setItem("simExpenses", JSON.stringify(simExpenses));
      setTimeout(() => {
        toggleOpen();
        dispatch({
          type: TOGGLE_SIM_FLAG,
        });
      }, 50);
      // USER - PERSONAL
    } else if (isAuthenticated) {
      if (props.type === "income") {
        fetch(
          `http://localhost:5000/api/budget/${userEmail}/monthly/incomes/${id}/edit`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${token}`,
            },
            body: JSON.stringify(incomeToEdit),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        setTimeout(() => {
          toggleOpen();
          dispatch({
            type: TOGGLE_FLAG,
          });
        }, 50);
      } else if (props.type === "expense") {
        fetch(
          `http://localhost:5000/api/budget/${userEmail}/monthly/expenses/${id}/edit`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${token}`,
            },
            body: JSON.stringify(expenseToEdit),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTimeout(() => {
              toggleOpen();
              dispatch({
                type: TOGGLE_FLAG,
              });
            }, 50);
          });
      } else if (props.type === "savings_income") {
        fetch(
          `http://localhost:5000/api/budget/${userEmail}/savings/incomes/${id}/edit`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${token}`,
            },
            body: JSON.stringify(incomeToEdit),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTimeout(() => {
              toggleOpen();
              dispatch({
                type: TOGGLE_SAVINGS_FLAG,
              });
            }, 50);
          });
      } else if (props.type === "savings_goal") {
        fetch(
          `http://localhost:5000/api/budget/${userEmail}/savings/expenses/${id}/edit`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${token}`,
            },
            body: JSON.stringify(savingsGoalToEdit),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTimeout(() => {
              toggleOpen();
              dispatch({
                type: TOGGLE_SAVINGS_FLAG,
              });
            }, 50);
          });
      } else console.log("invalid type");
    } else console.log("no auth");
  };

  // MAIN FUNCTION TO EDIT DATA
  const handleEditData = () => {
    if (!title) setTitleError(t("Common.EmptyError"));
    if (!amount) setAmountError(t("Common.EmptyError"));
    if (props.type === "savings_goal") {
      if (!price) setPriceError(t("Common.EmptyError"));
    }
    if (props.type === "savings_goal") {
      if (title && amount && price && !priceError && !titleError && !amountError) {
        editAPI();
      }
    } else {
      if (title && amount && !titleError && !amountError) {
        editAPI();
      }
    }
  };

  // MEMOIZED EDIT COMPONENT
  const memoEdit = useMemo(() => {
    return (
      <>
        <button
          disabled={(isOpenModal && !isOpen) || props.done === true ? true : ""}
          onClick={toggleOpen}
          className={isOpen ? "edit__btn active" : "edit__btn"}
        >
          <AiFillEdit />
        </button>
        <div className={isOpen ? "edit__modal active" : "edit__modal"}>
          <div className="edit__modalLoading"></div>
          <div className="edit__modalClose">
            <button onClick={toggleOpen} className="edit__closeBtn">
              X
            </button>
          </div>
          <div className="edit__modalMain">
            <FieldContainer
              title={t("Common.ModalTitle")}
              type="text"
              value={title}
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setTitleError("")}
            />
            <FieldContainer
              type="textarea"
              title={t("Common.ModalDescription")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {props.type === "savings_goal" ? (
              <FieldContainer
                title={t("Common.ModalPrice")}
                type="number"
                value={price}
                error={priceError}
                onChange={(e) => setPrice(e.target.value)}
                onFocus={() => setPriceError("")}
              />
            ) : (
              ""
            )}
            <FieldContainer
              title={
                props.type === "savings_goal"
                  ? t("Common.ModalCollected")
                  : t("Common.ModalAmount")
              }
              type="number"
              value={amount}
              error={amountError}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setAmountError("")}
            />
            {props.type === "expense" ||
            props.type === "savings_goal" ||
            props.type === "expense-sim" ? (
              <FieldContainer
                title={t("Common.ModalDeadline")}
                type="date"
                value={deadline ? new Date(deadline).toISOString().slice(0, 10) : ""}
                onChange={(e) => setDeadline(e.target.value)}
              />
            ) : (
              ""
            )}
          </div>
          <div className="edit__modalButton">
            <button onClick={handleEditData} className="edit__submitBtn">
              {t("Common.ModalEditBtn")}
            </button>
          </div>
        </div>
      </>
    );
  }, [
    isOpen,
    isOpenModal,
    title,
    description,
    amount,
    price,
    deadline,
    titleError,
    amountError,
    priceError,
    language,
    props.done,
  ]);

  return <div className="edit">{memoEdit}</div>;
};

export default Edit;

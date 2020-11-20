import React, { useState, useMemo } from "react";
import "./Add.scss";
import { FiPlus } from "react-icons/fi";
import {
  TOGGLE_MODAL,
  TOGGLE_FLAG,
  TOGGLE_SAVINGS_FLAG,
  TOGGLE_SIM_FLAG,
} from "../actionTypes";
import { useDispatch, useSelector } from "react-redux";
import FieldContainer from "./FieldContainer";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import Loading from "./Loading";

const Add = (props) => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const theme = useSelector((state) => state.theme.theme);

  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // INPUT STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [price, setPrice] = useState(null);

  // INPUT ERRORS STATE
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

  // FETCH DATA WITH API

  const addDataAPI = () => {
    const incomeToAdd = {
      id: Math.floor(Math.random() * 999999999999),
      title,
      description,
      amount: parseInt(amount),
      permanent:
        props.type === "permanently-incomes" || props.type === "permanently-incomes-sim"
          ? true
          : "",
    };

    const expenseToAdd = {
      id: Math.floor(Math.random() * 999999999999),
      title,
      description,
      amount: parseInt(amount),
      price: props.type === "savings-goals" ? price : "",
      deadline,
      permanent:
        props.type === "permanently-expenses" || props.type === "permanently-expenses-sim"
          ? true
          : "",
    };

    // INIT LOCAL STORAGE
    if (!localStorage.getItem("simIncomes")) {
      localStorage.setItem("simIncomes", JSON.stringify([]));
    }
    if (!localStorage.getItem("simExpenses")) {
      localStorage.setItem("simExpenses", JSON.stringify([]));
    }

    const simIncomes = JSON.parse(localStorage.getItem("simIncomes"));
    const simExpenses = JSON.parse(localStorage.getItem("simExpenses"));

    // CASES
    // SIMULATOR
    if (
      props.type === "permanently-incomes-sim" ||
      props.type === "temporary-incomes-sim"
    ) {
      simIncomes.push(incomeToAdd);
      localStorage.setItem("simIncomes", JSON.stringify(simIncomes));
      setIsLoading(true);
      setTitle("");
      setDescription("");
      setAmount(null);
      setPrice(null);
      setDeadline("");
      setTimeout(() => {
        toggleOpen();
        setIsLoading(false);
        dispatch({
          type: TOGGLE_SIM_FLAG,
        });
      }, 50);
    } else if (
      props.type === "permanently-expenses-sim" ||
      props.type === "temporary-expenses-sim"
    ) {
      simExpenses.push(expenseToAdd);
      localStorage.setItem("simExpenses", JSON.stringify(simExpenses));
      setIsLoading(true);
      setTitle("");
      setDescription("");
      setAmount(null);
      setPrice(null);
      setDeadline("");
      setTimeout(() => {
        setIsLoading(false);
        toggleOpen();
        dispatch({
          type: TOGGLE_SIM_FLAG,
        });
      }, 50);
      // USER - PERSONAL
    } else if (isAuthenticated) {
      setIsLoading(true);
      if (props.type === "permanently-incomes" || props.type === "temporary-incomes") {
        fetch(`http://localhost:5000/api/budget/${userEmail}/monthly/incomes/add`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
          body: JSON.stringify(incomeToAdd),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTitle("");
            setDescription("");
            setAmount(null);
            setTimeout(() => {
              setIsLoading(false);
              toggleOpen();
              dispatch({
                type: TOGGLE_FLAG,
              });
            }, 50);
          });
      } else if (
        props.type === "permanently-expenses" ||
        props.type === "temporary-expenses"
      ) {
        fetch(`http://localhost:5000/api/budget/${userEmail}/monthly/expenses/add`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
          body: JSON.stringify(expenseToAdd),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTitle("");
            setDescription("");
            setAmount(null);
            setDeadline("");
            setTimeout(() => {
              toggleOpen();
              setIsLoading(false);
              dispatch({
                type: TOGGLE_FLAG,
              });
            }, 50);
          });
      } else if (props.type === "savings-incomes") {
        fetch(`http://localhost:5000/api/budget/${userEmail}/savings/incomes/add`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
          body: JSON.stringify(incomeToAdd),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTitle("");
            setDescription("");
            setAmount(null);
            setTimeout(() => {
              toggleOpen();
              setIsLoading(false);
              dispatch({
                type: TOGGLE_SAVINGS_FLAG,
              });
            }, 50);
          });
      } else if (props.type === "savings-goals") {
        fetch(`http://localhost:5000/api/budget/${userEmail}/savings/expenses/add`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
          body: JSON.stringify(expenseToAdd),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTitle("");
            setDescription("");
            setAmount(null);
            setPrice(null);
            setDeadline("");
            setTimeout(() => {
              toggleOpen();
              setIsLoading(false);
              dispatch({
                type: TOGGLE_SAVINGS_FLAG,
              });
            }, 50);
          });
      } else return console.log("Invalid addType");
    } else return console.log("No auth");
  };

  // MAIN FUNCTION TO ADD DATA
  const handleAddData = () => {
    if (!title) setTitleError(t("Common.EmptyError"));
    if (!amount) setAmountError(t("Common.EmptyError"));
    if (props.type === "savings-goals") {
      if (!price) setPriceError(t("Common.EmptyError"));
    }

    if (props.type === "savings-goals") {
      if (title && amount && price && !titleError && !amountError && !priceError)
        addDataAPI();
    } else {
      if (title && amount && !titleError && !amountError) addDataAPI();
    }
  };

  // MEMOIZED ADD COMPONENT
  const memoAdd = useMemo(() => {
    return (
      <>
        <button
          disabled={isOpenModal && !isOpen ? true : false}
          onClick={toggleOpen}
          className={
            theme === "dark"
              ? isOpen
                ? "add__btn active dark"
                : "add__btn dark"
              : isOpen
              ? "add__btn active"
              : "add__btn"
          }
        >
          <FiPlus />
        </button>
        <div
          className={
            theme === "dark"
              ? isOpen
                ? "add__modal active dark"
                : "add__modal dark"
              : isOpen
              ? "add__modal active"
              : "add__modal"
          }
        >
          <div className="add__modalLoading">{isLoading ? <Loading /> : ""}</div>
          <div className="add__modalClose">
            <button onClick={toggleOpen} className="add__closeBtn">
              <GrClose />
            </button>
          </div>
          <div className="add__modalMain">
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
            {props.type === "savings-goals" ? (
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
                props.type === "savings-goals"
                  ? t("Common.ModalCollected")
                  : t("Common.ModalAmount")
              }
              type="number"
              value={amount}
              error={amountError}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setAmountError("")}
            />
            {props.type === "permanently-expenses" ||
            props.type === "temporary-expenses" ||
            props.type === "savings-goals" ||
            props.type === "permanently-expenses-sim" ||
            props.type === "temporary-expenses-sim" ? (
              <FieldContainer
                title={t("Common.ModalDeadline")}
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            ) : (
              ""
            )}
          </div>
          <div className="add__modalButton">
            <button onClick={handleAddData} className="add__submitBtn">
              {t("Common.ModalAddBtn")}
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
    theme,
    isLoading,
  ]);

  return <div className="add">{memoAdd}</div>;
};

export default Add;

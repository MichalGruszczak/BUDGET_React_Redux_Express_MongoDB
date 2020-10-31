import React, { useState, useMemo } from "react";
import "./Add.scss";
import { FiPlus } from "react-icons/fi";
import { TOGGLE_MODAL, TOGGLE_FLAG, TOGGLE_SAVINGS_FLAG } from "../actionTypes";
import { useDispatch, useSelector } from "react-redux";
import FieldContainer from "./FieldContainer";

const Add = (props) => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);

  const [isOpen, setIsOpen] = useState(false);

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
      amount,
      permanent: props.type === "permanently-incomes" ? true : "",
    };

    const expenseToAdd = {
      id: Math.floor(Math.random() * 999999999999),
      title,
      description,
      amount,
      price: props.type === "savings-goals" ? price : "",
      deadline,
      permanent: props.type === "permanently-expenses" ? true : "",
    };

    if (isAuthenticated) {
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
    if (!title) setTitleError("Empty field!");
    if (!amount) setAmountError("Empty field!");
    if (props.type === "savings-goals") {
      if (!price) setPriceError("Empty field!");
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
          className={isOpen ? "add__btn active" : "add__btn"}
        >
          <FiPlus />
        </button>
        <div className={isOpen ? "add__modal active" : "add__modal"}>
          <div className="add__modalLoading"></div>
          <div className="add__modalClose">
            <button onClick={toggleOpen} className="add__closeBtn">
              X
            </button>
          </div>
          <div className="add__modalMain">
            <FieldContainer
              title="Title"
              type="text"
              value={title}
              error={titleError}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setTitleError("")}
            />
            <FieldContainer
              type="textarea"
              title="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {props.type === "savings-goals" ? (
              <FieldContainer
                title="Price"
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
              title={props.type === "savings-goals" ? "Collected" : "Amount"}
              type="number"
              value={amount}
              error={amountError}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setAmountError("")}
            />
            {props.type === "permanently-expenses" ||
            props.type === "temporary-expenses" ||
            props.type === "savings-goals" ? (
              <FieldContainer
                title="Deadline"
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
              Add
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
  ]);

  return <div className="add">{memoAdd}</div>;
};

export default Add;

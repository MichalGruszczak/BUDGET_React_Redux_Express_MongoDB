import React, { useState, useMemo } from "react";
import "./Edit.scss";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_MODAL, TOGGLE_FLAG } from "../actionTypes";
import FieldContainer from "./FieldContainer";

const Edit = (props) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const id = props.id;

  // INPUT STATE
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [amount, setAmount] = useState(new Number(props.amount));
  const [deadline, setDeadline] = useState(props.deadline);

  // ERRORS STATE

  const [titleError, setTitleError] = useState("");
  const [amountError, setAmountError] = useState("");

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
      amount,
    };

    const expenseToEdit = {
      title,
      description,
      amount,
      deadline,
    };

    if (isAuthenticated) {
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
      } else console.log("invalid type");
    } else console.log("no auth");
  };

  // MAIN FUNCTION TO EDIT DATA
  const handleEditData = () => {
    if (!title) setTitleError("Empty field!");
    if (!amount) setAmountError("Empty field");
    if (title && amount && !titleError && !amountError) {
      editAPI();
    }
  };

  // MEMOIZED EDIT COMPONENT
  const memoEdit = useMemo(() => {
    return (
      <>
        <button
          disabled={isOpenModal && !isOpen ? true : ""}
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
            <FieldContainer
              title="Amount"
              type="number"
              value={amount}
              error={amountError}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setAmountError("")}
            />
            {props.type === "expense" ? (
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
          <div className="edit__modalButton">
            <button onClick={handleEditData} className="edit__submitBtn">
              Edit
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
    deadline,
    titleError,
    amountError,
  ]);

  return <div className="edit">{memoEdit}</div>;
};

export default Edit;

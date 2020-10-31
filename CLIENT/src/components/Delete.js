import React, { useMemo } from "react";
import "./Delete.scss";
import { AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_FLAG, TOGGLE_SAVINGS_FLAG } from "../actionTypes";

const Delete = (props) => {
  const dispatch = useDispatch();
  const id = props.id;
  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);

  // FETCH API DELETE
  const deleteAPI = () => {
    if (isAuthenticated) {
      fetch(
        props.type === "income"
          ? `http://localhost:5000/api/budget/${userEmail}/monthly/incomes/${id}/delete`
          : props.type === "expense"
          ? `http://localhost:5000/api/budget/${userEmail}/monthly/expenses/${id}/delete`
          : props.type === "savings_income"
          ? `http://localhost:5000/api/budget/${userEmail}/savings/incomes/${id}/delete`
          : props.type === "savings_goal"
          ? `http://localhost:5000/api/budget/${userEmail}/savings/expenses/${id}/delete`
          : "",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          dispatch({
            type:
              props.type === "savings_goal" || props.type === "savings_income"
                ? TOGGLE_SAVINGS_FLAG
                : TOGGLE_FLAG,
          });
        });
    } else console.log("no auth");
  };

  // MAIN FUNCTION TO DELETE ITEMS
  const handleDelete = () => {
    deleteAPI();
  };

  // MEMOIZED DELETE COMPONENT
  const memoDelete = useMemo(() => {
    return (
      <>
        <button
          disabled={isOpenModal ? true : ""}
          onClick={handleDelete}
          className="delete__btn"
        >
          <AiFillDelete />
        </button>
      </>
    );
  }, [isOpenModal]);

  return <div className="delete">{memoDelete}</div>;
};

export default Delete;

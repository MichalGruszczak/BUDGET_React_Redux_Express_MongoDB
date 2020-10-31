import React, { useMemo } from "react";
import "./Done.scss";
import { BiCheckCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_FLAG, TOGGLE_SAVINGS_FLAG } from "../actionTypes";

const Done = (props) => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const id = props.id;

  // DONE REST API function

  const doneAPI = () => {
    if (isAuthenticated) {
      fetch(
        props.type === "expense"
          ? `http://localhost:5000/api/budget/${userEmail}/monthly/expenses/${id}/done`
          : props.type === "savings_goal"
          ? `http://localhost:5000/api/budget/${userEmail}/savings/expenses/${id}/done`
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
            type: props.type === "savings_goal" ? TOGGLE_SAVINGS_FLAG : TOGGLE_FLAG,
          });
        });
    } else console.log("no auth");
  };

  // MAIN FUNCTION TO MARK AS DONE
  const handleDoneData = () => {
    doneAPI();
  };

  // MEMOIZED DONE COMPONENT

  const memoDone = useMemo(() => {
    return (
      <>
        <button
          onClick={handleDoneData}
          disabled={isOpenModal ? true : ""}
          className="done__btn"
        >
          <BiCheckCircle />
        </button>
      </>
    );
  }, [isOpenModal, props.done]);

  return <div className="done">{memoDone}</div>;
};

export default Done;

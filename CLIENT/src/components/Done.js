import React from "react";
import "./Done.scss";
import { BiCheckCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_FLAG } from "../actionTypes";

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
            type: TOGGLE_FLAG,
          });
        });
    } else console.log("no auth");
  };

  // MAIN FUNCTION TO MARK AS DONE
  const handleDoneData = () => {
    doneAPI();
  };

  return (
    <div className="done">
      <button
        onClick={handleDoneData}
        disabled={isOpenModal ? true : ""}
        className="done__btn"
      >
        <BiCheckCircle />
      </button>
    </div>
  );
};

export default Done;

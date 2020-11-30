import React, { useMemo, useState } from "react";
import "./Done.scss";
import { GoCheck } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_FLAG,
  TOGGLE_SAVINGS_FLAG,
  TOGGLE_SIM_FLAG,
  TOGGLE_MODAL,
} from "../actionTypes";
import Loading from "./Loading";

const Done = (props) => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const id = props.id;
  const theme = useSelector((state) => state.theme.theme);
  const [isLoading, setIsLoading] = useState(false);

  // DONE REST API function

  const doneAPI = () => {
    const simExpenses = JSON.parse(localStorage.getItem("simExpenses"));

    // CASE
    // SIMULATOR

    if (props.type === "expense-sim") {
      setIsLoading(true);
      let selectedExpense = simExpenses.find((item) => item.id === props.id);
      selectedExpense.done = true;
      localStorage.setItem("simExpenses", JSON.stringify(simExpenses));
      setTimeout(() => {
        setIsLoading(false);
        dispatch({
          type: TOGGLE_SIM_FLAG,
        });
      }, 50);
    }
    // USER - PERSONAL
    else if (isAuthenticated) {
      setIsLoading(true);
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
    if (props.inModal) {
      dispatch({
        type: TOGGLE_MODAL,
      });
    } else return;
  };

  // MEMOIZED DONE COMPONENT

  const memoDone = useMemo(() => {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            onClick={handleDoneData}
            disabled={isOpenModal && !props.inModal ? true : ""}
            className={theme === "dark" ? "done__btn dark" : "done__btn"}
          >
            <GoCheck />
          </button>
        )}
      </>
    );
  }, [isOpenModal, props.done, theme, isLoading]);

  return <div className="done">{memoDone}</div>;
};

export default Done;

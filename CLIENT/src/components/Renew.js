import React, { useMemo, useState } from "react";
import "./Renew.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_FLAG, TOGGLE_SIM_FLAG, TOGGLE_MODAL } from "../actionTypes";
import Loading from "./Loading";

const Renew = (props) => {
  const dispatch = useDispatch();
  const id = props.id;
  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const theme = useSelector((state) => state.theme.theme);
  const [isLoading, setIsLoading] = useState(false);

  // RENEW REST API FUNCTION
  const renewAPI = () => {
    const actualDeadline = new Date(props.deadline);
    const actualDeadlineMonth = actualDeadline.getMonth();

    const itemToRenew = {
      done: false,
      deadline: props.deadline ? actualDeadline.setMonth(actualDeadlineMonth + 1) : "",
    };

    // CASE
    // SIMULATOR

    const simExpenses = JSON.parse(localStorage.getItem("simExpenses"));

    if (props.type === "expense-sim") {
      setIsLoading(true);
      let selectedExpense = simExpenses.find((item) => item.id === props.id);
      selectedExpense.done = false;

      if (props.deadline) {
        let selectedExpenseDeadline = new Date(selectedExpense.deadline);
        let selectedExpenseDeadlineMonth = new Date(selectedExpense.deadline).getMonth();

        selectedExpense.deadline = selectedExpenseDeadline.setMonth(
          selectedExpenseDeadlineMonth + 1
        );
      }

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
        `http://localhost:5000/api/budget/${userEmail}/monthly/expenses/${id}/renew`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
          body: JSON.stringify(itemToRenew),
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

  // MAIN FUNCTION TO RENEW ITEM
  const handleRenewItem = () => {
    renewAPI();
    if (props.inModal) {
      dispatch({
        type: TOGGLE_MODAL,
      });
    } else return;
  };

  // MEMOIZED RENEW COMPONENT
  const memoRenew = useMemo(() => {
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            onClick={handleRenewItem}
            disabled={isOpenModal && !props.inModal ? true : ""}
            className={theme === "dark" ? "renew__btn dark" : "renew__btn"}
          >
            <FiRefreshCcw />
          </button>
        )}
      </>
    );
  }, [isOpenModal, props.done, theme, isLoading]);
  return <div className="renew">{memoRenew}</div>;
};

export default Renew;

import React, { useEffect } from "react";
import "./Monthly.scss";
import { GET_ITEMS } from "../actionTypes";
import { initialState } from "../reducers/itemReducer";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "./Accordion";
import Item from "./Item";

const Monthly = () => {
  {
    // console.log("Monthly reloaded");
  }
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const userToken = useSelector((state) => state.user.token);
  const items = useSelector((state) => state.items.monthly);

  // FILTERING MONTHLY BUDGET ITEMS
  const permanentIncomes = items.incomes.filter((item) => item.permanent === true);
  const permanentIncomesAmount = permanentIncomes
    .map((item) => item.amount)
    .reduce((a, b) => {
      return a + b;
    }, 0);
  const temporaryIncomes = items.incomes.filter((item) => item.permanent !== true);
  const temporaryIncomesAmount = temporaryIncomes
    .map((item) => item.amount)
    .reduce((a, b) => {
      return a + b;
    }, 0);
  const permanentExpenses = items.expenses.filter((item) => item.permanent === true);
  const permanentExpensesAmount = permanentExpenses
    .map((item) => item.amount)
    .reduce((a, b) => {
      return a + b;
    }, 0);
  const temporaryExpenses = items.expenses.filter((item) => item.permanent !== true);
  const temporaryExpensesAmount = temporaryExpenses
    .map((item) => item.amount)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  // GET USER BUDGET DATA
  const getItems = () => {
    if (isAuthenticated) {
      fetch(`http://localhost:5000/api/budget/${userEmail}`, {
        method: "GET",
        headers: {
          "x-auth-token": `${userToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: GET_ITEMS,
            payload: data,
          });
        });
    } else
      dispatch({
        type: GET_ITEMS,
        payload: initialState,
      });
  };

  useEffect(() => {
    getItems();
  }, [isAuthenticated]);

  return (
    <div className="monthly">
      <Accordion
        title={"Permanently Incomes"}
        amount={permanentIncomesAmount}
        type={"income"}
        content={permanentIncomes.map((item) => (
          <Item
            type="income"
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
          />
        ))}
      />
      <Accordion
        title={"Temporary Incomes"}
        amount={temporaryIncomesAmount}
        type={"income"}
        content={temporaryIncomes.map((item) => (
          <Item
            type="income"
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
          />
        ))}
      />
      <Accordion
        title={"Permanently Expenses"}
        amount={permanentExpensesAmount}
        type={"expense"}
        content={permanentExpenses.map((item) => (
          <Item
            type="expense"
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
            deadline={item.deadline}
          />
        ))}
      />
      <Accordion
        title={"Temporary Expenses"}
        amount={temporaryExpensesAmount}
        type={"expense"}
        content={temporaryExpenses.map((item) => (
          <Item
            type="expense"
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
            deadline={item.deadline}
          />
        ))}
      />
    </div>
  );
};

export default Monthly;

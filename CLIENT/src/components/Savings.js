import React, { useEffect } from "react";
import "./Savings.scss";
import { initialState } from "../reducers/itemReducer";
import { GET_ITEMS } from "../actionTypes";
import Accordion from "./Accordion";
import Item from "./Item";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";

const Savings = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const userToken = useSelector((state) => state.user.token);
  const items = useSelector((state) => state.items.savings);
  const savingsFlag = useSelector((state) => state.items.savingsFlag);

  const savingsAmount = items.incomes
    .map((item) => item.amount)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const savingsGoalsAmount = items.expenses
    .map((item) => item.amount)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const getData = () => {
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
    getData();
  }, [isAuthenticated, savingsFlag]);

  return (
    <div className="savings">
      <Accordion
        type="income"
        title="Savings"
        amount={savingsAmount}
        addType={"savings-incomes"}
        content={items.incomes.map((item) => (
          <Item
            type="savings_income"
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
          />
        ))}
      />
      <Accordion
        type="expense"
        title="Savings Goals"
        amount={savingsGoalsAmount}
        addType={"savings-goals"}
        content={items.expenses.map((item) => (
          <Item
            type="savings_goal"
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
            price={item.price}
            deadline={item.deadline}
            done={item.done}
          />
        ))}
      />
      <Footer
        type="budget"
        incTitle="Savings"
        expTitle="Collected for goals"
        incomesValue={savingsAmount}
        expensesValue={savingsGoalsAmount}
      />
    </div>
  );
};

export default Savings;

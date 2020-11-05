import React, { useEffect, useMemo } from "react";
import "./Monthly.scss";
import { GET_ITEMS } from "../actionTypes";
import { initialState } from "../reducers/itemReducer";
import { useSelector, useDispatch } from "react-redux";
import Accordion from "./Accordion";
import Item from "./Item";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";

const Monthly = () => {
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const userToken = useSelector((state) => state.user.token);
  const items = useSelector((state) => state.items.monthly);
  const flag = useSelector((state) => state.items.flag);

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

  const incomesValue = permanentIncomesAmount + temporaryIncomesAmount;

  const expensesValue = permanentExpensesAmount + temporaryExpensesAmount;

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
  }, [isAuthenticated, flag]);

  // MEMOIZED MONTHLY COMPONENT
  const memoMonthly = useMemo(() => {
    return (
      <>
        <Accordion
          title={t("Accordions.PermanentlyIncomes")}
          amount={permanentIncomesAmount}
          type={"income"}
          addType={"permanently-incomes"}
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
          title={t("Accordions.TemporaryIncomes")}
          amount={temporaryIncomesAmount}
          type={"income"}
          addType={"temporary-incomes"}
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
          title={t("Accordions.PermanentlyExpenses")}
          amount={permanentExpensesAmount}
          type={"expense"}
          addType={"permanently-expenses"}
          content={permanentExpenses.map((item) => (
            <Item
              type="expense"
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              amount={item.amount}
              deadline={item.deadline}
              done={item.done}
              permanent={item.permanent}
            />
          ))}
        />
        <Accordion
          title={t("Accordions.TemporaryExpenses")}
          amount={temporaryExpensesAmount}
          type={"expense"}
          addType={"temporary-expenses"}
          content={temporaryExpenses.map((item) => (
            <Item
              type="expense"
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              amount={item.amount}
              deadline={item.deadline}
              done={item.done}
            />
          ))}
        />
        <Footer
          type="budget"
          incTitle={t("Footer.Incomes")}
          expTitle={t("Footer.Expenses")}
          incomesValue={incomesValue}
          expensesValue={expensesValue}
        />
      </>
    );
  }, [isAuthenticated, items, flag, language]);

  return <div className="monthly">{memoMonthly}</div>;
};

export default Monthly;

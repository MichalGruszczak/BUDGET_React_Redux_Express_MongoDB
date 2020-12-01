import React, { useEffect, useMemo } from "react";
import "./Savings.scss";
import { initialState } from "../reducers/itemReducer";
import { GET_ITEMS } from "../actionTypes";
import Accordion from "./Accordion";
import Item from "./Item";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Savings = () => {
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userEmail = useSelector((state) => state.user.email);
  const userToken = useSelector((state) => state.user.token);
  const items = useSelector((state) => state.items.savings);
  const savingsFlag = useSelector((state) => state.items.savingsFlag);
  const theme = useSelector((state) => state.theme.theme);

  const undoneSavingsGoals = items.expenses.filter((item) => item.done === false);

  const doneSavingsGoals = items.expenses.filter((item) => item.done === true);

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
      fetch(`https://budgetmg.herokuapp.com/api/budget/${userEmail}`, {
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

  // MEMOIZED SAVINGS COMPONENT
  const memoSavings = useMemo(() => {
    return (
      <>
        {isAuthenticated ? (
          <>
            <Accordion
              type="income"
              title={t("Accordions.Savings")}
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
              title={t("Accordions.SavingsGoals")}
              amount={savingsGoalsAmount}
              addType={"savings-goals"}
              content={[
                undoneSavingsGoals.map((item) => (
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
                )),
                doneSavingsGoals.map((item) => (
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
                )),
              ]}
            />
          </>
        ) : (
          <span
            className={
              theme === "dark" ? "savings__noAuthMessage dark" : "savings__noAuthMessage"
            }
          >
            {t("NoAuth.Main1")}
            <br />
            {t("NoAuth.Main2")}
          </span>
        )}
        <Footer
          type="budget"
          incTitle={t("Footer.Savings")}
          expTitle={t("Footer.CollectedForGoals")}
          incomesValue={savingsAmount}
          expensesValue={savingsGoalsAmount}
        />
      </>
    );
  }, [isAuthenticated, items, savingsFlag, language, theme]);

  return <div className="savings">{memoSavings}</div>;
};

export default Savings;

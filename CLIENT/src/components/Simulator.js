import React, { useMemo } from "react";
import "./Simulator.scss";
import Accordion from "./Accordion";
import Item from "./Item";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Simulator = () => {
  const simFlag = useSelector((state) => state.items.simFlag);

  // PARSE JSON  TO OBJECT
  const simIncomes = JSON.parse(localStorage.getItem("simIncomes"));
  const simExpenses = JSON.parse(localStorage.getItem("simExpenses"));

  // FILTERING MONTHLY BUDGET ITEMS

  const permanentIncomes = simIncomes
    ? simIncomes.filter((item) => item.permanent === true)
    : [];
  const permanentIncomesAmount = simIncomes
    ? permanentIncomes
        .map((item) => item.amount)
        .reduce((a, b) => {
          return a + b;
        }, 0)
    : 0;
  const temporaryIncomes = simIncomes
    ? simIncomes.filter((item) => item.permanent !== true)
    : [];
  const temporaryIncomesAmount = simIncomes
    ? temporaryIncomes
        .map((item) => item.amount)
        .reduce((a, b) => {
          return a + b;
        }, 0)
    : 0;
  const permanentExpenses = simExpenses
    ? simExpenses.filter((item) => item.permanent === true)
    : [];
  const permanentExpensesAmount = simExpenses
    ? permanentExpenses
        .map((item) => item.amount)
        .reduce((a, b) => {
          return a + b;
        }, 0)
    : 0;
  const temporaryExpenses = simExpenses
    ? simExpenses.filter((item) => item.permanent !== true)
    : [];
  const temporaryExpensesAmount = simExpenses
    ? temporaryExpenses
        .map((item) => item.amount)
        .reduce((a, b) => {
          return a + b;
        }, 0)
    : 0;

  const incomesValue = permanentIncomesAmount + temporaryIncomesAmount;

  const expensesValue = permanentExpensesAmount + temporaryExpensesAmount;

  // MEMOIZED SIMULATORS

  const memoSimulator = useMemo(() => {
    return (
      <>
        <Accordion
          title={"Permanently Incomes"}
          amount={permanentIncomesAmount}
          type={"income"}
          addType={"permanently-incomes-sim"}
          content={permanentIncomes.map((item) => (
            <Item
              type="income-sim"
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
          addType={"temporary-incomes-sim"}
          content={temporaryIncomes.map((item) => (
            <Item
              type="income-sim"
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
          addType={"permanently-expenses-sim"}
          content={permanentExpenses.map((item) => (
            <Item
              type="expense-sim"
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
          title={"Temporary Expenses"}
          amount={temporaryExpensesAmount}
          type={"expense"}
          addType={"temporary-expenses-sim"}
          content={temporaryExpenses.map((item) => (
            <Item
              type="expense-sim"
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
          incTitle="Incomes"
          expTitle="Expenses"
          incomesValue={incomesValue}
          expensesValue={expensesValue}
        />
      </>
    );
  }, [simIncomes, simExpenses, simFlag]);

  return <div className="simulator">{memoSimulator}</div>;
};

export default Simulator;

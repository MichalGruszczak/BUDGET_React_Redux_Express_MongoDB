import React from "react";
import "./Monthly.scss";
import Accordion from "./Accordion";

const contentIncomes = <h1>My incomes</h1>;
const contentExpenses = <h1>My expenses</h1>;

const Monthly = () => {
  return (
    <div className="monthly">
      <Accordion
        title={"Permanently incomes"}
        amount={5000}
        type={"income"}
        content={contentIncomes}
      />
      <Accordion
        title={"Permanently expenses"}
        amount={1000}
        type={"expense"}
        content={contentExpenses}
      />
    </div>
  );
};

export default Monthly;

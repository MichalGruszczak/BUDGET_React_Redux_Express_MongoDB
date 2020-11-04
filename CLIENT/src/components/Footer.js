import React from "react";
import "./Footer.scss";

const Footer = (props) => {
  const monthlyResult = props.incomesValue - props.expensesValue;

  return props.type === "budget" ? (
    <div className="footer">
      <div className="footer__incomes">{props.incTitle}</div>
      <div className="footer__incValue">{props.incomesValue}</div>
      <div className="footer__expenses">{props.expTitle}</div>
      <div className="footer__expValue">{props.expensesValue}</div>
      <div className="footer__result">Result</div>
      <div className={monthlyResult > 0 ? "footer__resValue" : "footer__resValue red"}>
        {monthlyResult}
      </div>
    </div>
  ) : (
    <div className="footer__info">
      <span>All rights reserved</span>
    </div>
  );
};

export default Footer;

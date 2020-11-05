import React, { useMemo } from "react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";

const Footer = (props) => {
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");
  const monthlyResult = props.incomesValue - props.expensesValue;

  const memoFooter = useMemo(() => {
    return (
      <>
        <div className="footer__incomes">{props.incTitle}</div>
        <div className="footer__incValue">{props.incomesValue}</div>
        <div className="footer__expenses">{props.expTitle}</div>
        <div className="footer__expValue">{props.expensesValue}</div>
        <div className="footer__result">{t("Footer.Result")}</div>
        <div className={monthlyResult > 0 ? "footer__resValue" : "footer__resValue red"}>
          {monthlyResult}
        </div>
      </>
    );
  }, [props, language]);

  return props.type === "budget" ? (
    <div className="footer">{memoFooter}</div>
  ) : (
    <div className="footer__info">
      <span>{t("Footer.Rights")}</span>
    </div>
  );
};

export default Footer;

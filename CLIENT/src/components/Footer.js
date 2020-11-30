import React, { useMemo, useState, useEffect } from "react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Title from "./Title";

const Footer = (props) => {
  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");
  const monthlyResult = props.incomesValue - props.expensesValue;
  const theme = useSelector((state) => state.theme.theme);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  const memoFooter = useMemo(() => {
    return (
      <>
        {width < 599.98 ? (
          <>
            <div className="footer__incValue">{props.incomesValue}</div>
            <div className="footer__expValue">{props.expensesValue}</div>
            <div
              className={monthlyResult > 0 ? "footer__resValue" : "footer__resValue red"}
            >
              {monthlyResult}
            </div>
          </>
        ) : (
          <>
            <div className="footer__incomes">{props.incTitle}</div>
            <div className="footer__incValue">{props.incomesValue}</div>
            <div className="footer__expenses">{props.expTitle}</div>
            <div className="footer__expValue">{props.expensesValue}</div>
            <div className="footer__result">{t("Footer.Result")}</div>
            <div
              className={monthlyResult > 0 ? "footer__resValue" : "footer__resValue red"}
            >
              {monthlyResult}
            </div>
          </>
        )}
      </>
    );
  }, [props, language, width]);

  return props.type === "budget" ? (
    <div className={theme === "dark" ? "footer dark" : "footer"}>{memoFooter}</div>
  ) : (
    <div className={theme === "dark" ? "footer__info dark" : "footer__info"}>
      {width < 749.98 ? (
        <>
          <div className="footer__infoName">Michał Gruszczak</div>
          <div className="footer__infoTitle">
            <Title />
          </div>
          <div className="footer__infoPhone">+48 790 594 079</div>
          <div className="footer__infoEmail">
            <a href="mailto:michal.gruszczak94@gmail.com">michal.gruszczak94@gmail.com</a>
          </div>
        </>
      ) : (
        <>
          <div className="footer__infoName">Michał Gruszczak</div>
          <div className="footer__infoPhone">+48 790 594 079</div>
          <div className="footer__infoEmail">
            <a href="mailto:michal.gruszczak94@gmail.com">michal.gruszczak94@gmail.com</a>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;

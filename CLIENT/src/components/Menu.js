import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";
import { useTranslation } from "react-i18next";
import { AiOutlineDown } from "react-icons/ai";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("");
  const { t } = useTranslation();

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="menu">
      <button className="menu__btn" onClick={toggle}>
        <div className="menu__btnText">
          {option === "monthly"
            ? t("Menu.Monthly")
            : option === "savings"
            ? t("Menu.Savings")
            : option === "simulator"
            ? t("Menu.Simulator")
            : option === "settings"
            ? t("Menu.Settings")
            : "Menu"}
        </div>
        <div className="menu__btnArrow">
          <AiOutlineDown className={isOpen ? "menu__icon active" : "menu__icon"} />
        </div>
      </button>
      <div className={isOpen ? "menu__drop menu__active" : "menu__drop"}>
        <div className="menu__itemMonthly">
          <NavLink
            onClick={() => {
              setOption("monthly");
              toggle();
            }}
            className="menu__link"
            to="/"
            exact
          >
            {t("Menu.MonthlyLong")}
          </NavLink>
        </div>
        <div className="menu__itemSavings">
          <NavLink
            onClick={() => {
              setOption("savings");
              toggle();
            }}
            className="menu__link"
            to="/savings"
          >
            {t("Menu.Savings")}
          </NavLink>
        </div>
        <div className="menu__itemSimulator">
          <NavLink
            onClick={() => {
              setOption("simulator");
              toggle();
            }}
            className="menu__link"
            to="/simulator"
          >
            {t("Menu.Simulator")}
          </NavLink>
        </div>
        <div className="menu__itemSettings">
          <NavLink
            onClick={() => {
              setOption("settings");
              toggle();
            }}
            className="menu__link"
            to="/settings"
          >
            {t("Menu.Settings")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;

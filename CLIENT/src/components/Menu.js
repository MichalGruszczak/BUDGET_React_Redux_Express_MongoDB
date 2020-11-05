import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="menu">
      <button className="menu__btn" onClick={toggle}>
        Menu
      </button>
      <div className={isOpen ? "menu__drop menu__active" : "menu__drop"}>
        <div className="menu__itemMonthly">
          <NavLink className="menu__link" to="/" exact>
            {t("Menu.Monthly")}
          </NavLink>
        </div>
        <div className="menu__itemSavings">
          <NavLink className="menu__link" to="/savings">
            {t("Menu.Savings")}
          </NavLink>
        </div>
        <div className="menu__itemSimulator">
          <NavLink className="menu__link" to="/simulator">
            {t("Menu.Simulator")}
          </NavLink>
        </div>
        <div className="menu__itemSettings">
          <NavLink className="menu__link" to="/settings">
            {t("Menu.Settings")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;

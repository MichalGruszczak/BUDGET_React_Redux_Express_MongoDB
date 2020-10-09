import React, { useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import "./Menu.scss";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <div className="menu">
        <button className="menu__btn" onClick={toggle}>
          Menu
        </button>
        <div className={isOpen ? "menu__drop menu__active" : "menu__drop"}>
          <div className="menu__itemMonthly">
            <NavLink className="menu__link" to="/" exact>
              Monthly budget
            </NavLink>
          </div>
          <div className="menu__itemSavings">
            <NavLink className="menu__link" to="/savings">
              Savings
            </NavLink>
          </div>
          <div className="menu__itemSimulator">
            <NavLink className="menu__link" to="/simulator">
              Simulator
            </NavLink>
          </div>
          <div className="menu__itemSettings">
            <NavLink className="menu__link" to="/settings">
              Settings
            </NavLink>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Menu;
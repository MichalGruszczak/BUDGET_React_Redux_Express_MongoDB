import React from "react";
import "./Navbar.scss";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav__menu">
        <Menu />
      </div>
      <div className="nav__title"></div>
      <div className="nav__login"></div>
      <div className="nav__register"></div>
    </div>
  );
};

export default Navbar;

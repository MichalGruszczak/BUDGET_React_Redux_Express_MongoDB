import React from "react";
import "./Navbar.scss";
import Menu from "./Menu";
import Title from "./Title";
import LogReg from './LogReg';

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav__menu">
        <Menu />
      </div>
      <div className="nav__title">
        <Title />
      </div>
      <div className="nav__logReg"><LogReg/></div>
      
    </div>
  );
};

export default Navbar;

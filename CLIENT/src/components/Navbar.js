import React from "react";
import "./Navbar.scss";
import Menu from "./Menu";
import Title from "./Title";
import LogReg from "./LogReg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme === "dark" ? "nav dark" : "nav"}>
      <div className="nav__menu">
        <Menu />
      </div>
      <div className="nav__title">
        <Title />
      </div>
      <div className="nav__logReg">
        <LogReg />
      </div>
    </div>
  );
};

export default Navbar;

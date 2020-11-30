import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Menu from "./Menu";
import Title from "./Title";
import LogReg from "./LogReg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className={theme === "dark" ? "nav dark" : "nav"}>
      <div className="nav__menu">
        <Menu />
      </div>
      {width > 749.98 ? (
        <div className="nav__title">
          <Title />
        </div>
      ) : (
        ""
      )}
      <div className="nav__logReg">
        <LogReg />
      </div>
    </div>
  );
};

export default Navbar;

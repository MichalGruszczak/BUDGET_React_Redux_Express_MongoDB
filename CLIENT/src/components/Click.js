import React from "react";
import "./Click.scss";
import { useSelector } from "react-redux";

const Click = () => {
  const theme = useSelector((state) => state.theme.theme);
  return <div className={theme === "dark" ? "click dark" : "click"}></div>;
};

export default Click;

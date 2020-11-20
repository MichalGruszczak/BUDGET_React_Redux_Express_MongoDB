import React from "react";
import "./Title.scss";
import { FaCommentDollar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Title = (props) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "dark" ? "title dark" : "title"}>
      <div className="title__icon">
        <FaCommentDollar />
      </div>
      <div className="title__verticalBar">
        <div
          className={theme === "dark" ? "title__barInside dark" : "title__barInside"}
        ></div>
      </div>
      <div className="title__text">
        Budget by <span className="title__mg">M.G.</span>
      </div>
    </div>
  );
};

export default Title;

import React from "react";
import "./Title.scss";
import { FaCommentDollar } from "react-icons/fa";

const Title = () => {
  return (
    <div className="title">
      <div className="title__icon">
        <FaCommentDollar />
      </div>
      <div className="title__verticalBar">
        <div className="title__barInside"></div>
      </div>
      <div className="title__text">
        Budget by <span className="title__mg">M.G.</span>
      </div>
    </div>
  );
};

export default Title;

import React from "react";
import "./SuspenseLoading.scss";
import Title from "./Title";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const SuspenseLoading = (props) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div
      className={
        theme === "dark"
          ? props.type === "index"
            ? "suspense index dark"
            : "suspense dark"
          : props.type === "index"
          ? "suspense index"
          : "suspense"
      }
    >
      <div className="suspense__container">
        <div className="suspense__item loading">
          <Loading />
        </div>
        <div className="suspense__item title">
          <Title />
        </div>
      </div>
    </div>
  );
};

export default SuspenseLoading;

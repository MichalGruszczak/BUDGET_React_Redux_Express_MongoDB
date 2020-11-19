import React from "react";
import "./FieldContainer.scss";
import { useSelector } from "react-redux";

const FieldContainer = (props) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme === "dark" ? "field dark" : "field"}>
      <div className="field__labelContainer">
        <label className="field__label">{props.title}</label>
      </div>
      <div className="field__inputContainer">
        {props.type === "textarea" ? (
          <textarea
            value={props.value}
            rows={3}
            onChange={props.onChange}
            className="field__textarea"
          />
        ) : (
          <input
            value={props.value ? props.value : ""}
            onChange={props.onChange}
            className="field__input"
            onFocus={props.onFocus}
            type={
              props.type === "text"
                ? "text"
                : props.type === "number"
                ? "number"
                : props.type === "date"
                ? "date"
                : ""
            }
          />
        )}
      </div>
      <div className="field__errorContainer">
        <span className="field__error">{props.error}</span>
      </div>
    </div>
  );
};

export default FieldContainer;

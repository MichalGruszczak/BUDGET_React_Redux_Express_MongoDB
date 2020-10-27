import React from "react";
import "./FieldContainer.scss";

const FieldContainer = (props) => {
  return (
    <div className="field">
      <div className="field__labelContainer">
        <label className="field__label">{props.title}</label>
      </div>
      <div className="field__inputContainer">
        {props.type === "textarea" ? (
          <textarea
            value={props.value}
            onChange={props.onChange}
            className="field__input"
          />
        ) : (
          <input
            value={props.value}
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

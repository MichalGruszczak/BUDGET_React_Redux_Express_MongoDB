import React, { useState } from "react";
import "./Accordion.scss";
import { AiOutlineDown } from "react-icons/ai";
import Add from "./Add";

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      {/* {console.log("Accordion reloaded")} */}
      <div
        className={props.type === "income" ? "accordion__bar" : "accordion__bar expense"}
      >
        <div onClick={toggleAccordion} className="accordion__title">
          <span>{props.title}</span>
        </div>
        <div onClick={toggleAccordion} className="accordion__amount">
          <span>{props.amount}</span>
        </div>
        <div className="accordion__add">
          <Add type={props.addType} />
        </div>
        <div onClick={toggleAccordion} className="accordion__arrow">
          <AiOutlineDown
            className={isOpen ? "accordion__icon active" : "accordion__icon"}
          />
        </div>
      </div>
      <div className={isOpen ? "accordion__content active" : "accordion__content"}>
        {props.content}
      </div>
    </div>
  );
};

export default Accordion;

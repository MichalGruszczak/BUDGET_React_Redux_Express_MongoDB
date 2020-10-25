import React, { useState } from "react";
import "./Accordion.scss";
import { AiOutlineDown } from "react-icons/ai";

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      {/* {console.log("Accordion reloaded")} */}
      <button
        onClick={toggleAccordion}
        className={props.type === "income" ? "accordion__bar" : "accordion__bar expense"}
      >
        <div className="accordion__title">
          <span>{props.title}</span>
        </div>
        <div className="accordion__amount">
          <span>{props.amount}</span>
        </div>
        <div className="accordion__arrow">
          <AiOutlineDown
            className={isOpen ? "accordion__icon active" : "accordion__icon"}
          />
        </div>
      </button>
      <div className={isOpen ? "accordion__content active" : "accordion__content"}>
        {props.content}
      </div>
    </div>
  );
};

export default Accordion;

import React, { useState, useMemo } from "react";
import "./Accordion.scss";
import { AiOutlineDown } from "react-icons/ai";
import Add from "./Add";
import { useSelector } from "react-redux";

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // MEMOIZED ACCORDION COMPONENT
  const memoAccordion = useMemo(() => {
    return (
      <>
        <div
          className={
            theme === "dark"
              ? props.type === "income"
                ? "accordion__bar dark"
                : "accordion__bar expense dark"
              : props.type === "income"
              ? "accordion__bar"
              : "accordion__bar expense"
          }
        >
          <div onClick={toggleAccordion} className="accordion__title">
            <span className="accordion__titleText">{props.title}</span>
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
      </>
    );
  }, [isOpen, props.amount, props.content, theme]);

  return <div className="accordion">{memoAccordion}</div>;
};

export default Accordion;

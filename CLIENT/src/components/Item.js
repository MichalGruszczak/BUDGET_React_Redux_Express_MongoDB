import React, { useState } from "react";
import "./Item.scss";
import { MdDescription } from "react-icons/md";
import { HiCursorClick } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";

const Item = (props) => {
  const [isDescription, setIsDescription] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const demoTitle = "Demo Title";
  const demoDescription = "Demo Description";

  // Run text change and div animation synchronized
  const toggleDescription = () => {
    setIsAnimating(true);
    setTimeout(() => setIsDescription(!isDescription), 150);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={props.type === "income" ? "item income" : "item"}>
      <div onClick={toggleDescription} className="item__title">
        {demoDescription ? (
          <>
            <div className={isAnimating ? "item__titleText active" : "item__titleText"}>
              <span
                className={isAnimating ? "item__textSpan active" : "expense__textSpan"}
              >
                {isDescription ? demoDescription : demoTitle}
              </span>
            </div>
            <div className="item__click">
              <HiCursorClick />
            </div>
            <div className="item__description">
              <MdDescription />
            </div>
          </>
        ) : (
          <div className="item__titleWithoutDescr">Without description</div>
        )}
      </div>
      <div className="item__amount">500</div>
      {props.type === "income" ? null : <div className="item__deadline">10.10.2020</div>}
      <div className="item__options">
        <div className="item__edit">
          <button className="item__btn edit">
            <AiFillEdit />
          </button>
        </div>
        <div className="item__delete">
          <button className="item__btn delete">
            <AiFillDelete />
          </button>
        </div>
        {props.type === "income" ? (
          <div className="item__empty"></div>
        ) : (
          <div className="item__done">
            <button className="item__btn done">
              <BiCheckCircle />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;

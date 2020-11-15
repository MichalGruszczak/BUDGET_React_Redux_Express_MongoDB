import React, { useState, useMemo } from "react";
import "./Item.scss";
import { MdDescription } from "react-icons/md";
import { HiCursorClick } from "react-icons/hi";
import Edit from "./Edit";
import Delete from "./Delete";
import Done from "./Done";
import Renew from "./Renew";
import { useTranslation } from "react-i18next";

const Item = (props) => {
  const [isDescription, setIsDescription] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isDateAnimating, setIsDateAnimating] = useState(false);

  const { t } = useTranslation();
  const language = localStorage.getItem("i18nextLng");

  // Run text change and div animation synchronized
  const toggleDescription = () => {
    setIsAnimating(true);
    setTimeout(() => setIsDescription(!isDescription), 150);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const toggleDate = () => {
    setIsDateAnimating(true);
    setTimeout(() => setIsDate(!isDate), 150);
    setTimeout(() => setIsDateAnimating(false), 300);
  };

  const deadline = new Date(props.deadline);
  const now = new Date();
  const dateDiff = deadline.getTime() - now.getTime();
  const daysToDeadline = 1 + Math.floor(dateDiff / (1000 * 60 * 60 * 24));

  // MEMOIZED ITEM COMPONENT

  const memoItem = useMemo(() => {
    return (
      <>
        <div onClick={toggleDescription} className="item__title">
          {props.description ? (
            <>
              <div className={isAnimating ? "item__titleText active" : "item__titleText"}>
                <span
                  className={isAnimating ? "item__textSpan active" : "expense__textSpan"}
                >
                  {isDescription ? props.description : props.title}
                </span>
              </div>
              <div className="item__click">
                <HiCursorClick />
              </div>
              <div className="item__description">
                <MdDescription
                  className={isDescription ? "item__descriptionIcon active" : ""}
                />
              </div>
            </>
          ) : (
            <div className="item__titleWithoutDescr">{props.title}</div>
          )}
        </div>
        {props.type === "savings_goal" ? (
          <div className={"item__goalValues"}>
            <div className="item__goalPrice">
              <div className="item__goalTitle">{t("Common.ModalPrice")}</div>
              <div className="item__goalValue">{props.price}</div>
            </div>
            <div className="item__goalAmount">
              <div className="item__goalTitle">{t("Common.ModalCollected")}</div>
              <div className="item__goalValue">{props.amount}</div>
            </div>
            <div className="item__goalAmountResult">
              <div className="item__goalTitle">{t("Item.Left")}</div>
              <div className="item__goalValue">{props.price - props.amount}</div>
            </div>
          </div>
        ) : (
          <div className="item__amount">{props.amount}</div>
        )}
        {props.type === "income" ||
        props.type === "income-sim" ||
        props.type === "savings_income" ? null : (
          <div className={"item__deadline"}>
            {props.done ? null : props.deadline ? (
              <div
                onClick={toggleDate}
                className={
                  isDateAnimating
                    ? "item__deadlineContainer active"
                    : "item__deadlineContainer"
                }
              >
                <span
                  className={
                    isDateAnimating ? "item__deadlineText active" : "item__deadlineText"
                  }
                >
                  {isDate
                    ? new Date(props.deadline).toISOString().slice(0, 10)
                    : `${daysToDeadline} d`}
                </span>
                <div className="item__clickSign">
                  <HiCursorClick />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        <div className="item__options">
          <div className="item__edit">
            {props.done ? (
              ""
            ) : (
              <Edit
                id={props.id}
                title={props.title}
                description={props.description}
                amount={props.amount}
                deadline={props.deadline}
                type={props.type}
                price={props.price}
                done={props.done}
              />
            )}
          </div>
          <div className="item__delete">
            <Delete id={props.id} type={props.type} />
          </div>
          {props.type === "income" ||
          props.type === "income-sim" ||
          props.type === "savings_income" ? (
            <div className="item__empty"></div>
          ) : (
            <div className={"item__done"}>
              {props.done ? (
                props.permanent ? (
                  <Renew id={props.id} type={props.type} deadline={props.deadline} />
                ) : (
                  ""
                )
              ) : (
                <Done id={props.id} type={props.type} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }, [props, isDate, isDateAnimating, isDescription, isAnimating, language]);

  return (
    <div
      className={
        props.type === "income" ||
        props.type === "income-sim" ||
        props.type === "savings_income"
          ? "item income"
          : props.type === "savings_goal"
          ? props.done
            ? "item goal finished"
            : daysToDeadline < 0 && props.deadline
            ? "item goal expired"
            : daysToDeadline >= 0 && daysToDeadline <= 3 && props.deadline
            ? "item goal close"
            : "item goal"
          : props.done
          ? "item finished"
          : daysToDeadline < 0 && props.deadline
          ? "item expired"
          : daysToDeadline >= 0 && daysToDeadline <= 3 && props.deadline
          ? "item close"
          : "item"
      }
    >
      {memoItem}
    </div>
  );
};

export default Item;

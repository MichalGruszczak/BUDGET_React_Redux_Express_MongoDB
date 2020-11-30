import React, { useState, useMemo, useEffect } from "react";
import "./Item.scss";
import { MdDescription } from "react-icons/md";
import Click from "./Click";
import Edit from "./Edit";
import Delete from "./Delete";
import Done from "./Done";
import Renew from "./Renew";
import Options from "./Options";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_MODAL } from "../actionTypes";
import { GrClose } from "react-icons/gr";

const Item = (props) => {
  const [isDescription, setIsDescription] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isDateAnimating, setIsDateAnimating] = useState(false);
  const theme = useSelector((state) => state.theme.theme);
  const [width, setWidth] = useState(window.innerWidth);
  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  // OPEN CLOSE GOAL INFO

  const toggleInfoOpen = () => {
    setIsInfoOpen(!isInfoOpen);
    dispatch({
      type: TOGGLE_MODAL,
    });
  };

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

  const deadlineDay = deadline.getUTCDate();
  const deadlineMonth = deadline.getUTCMonth() + 1;
  const deadlineYear = deadline.getFullYear();

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
                {/* <HiCursorClick /> */}
                <Click />
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
            {width < 749.98 ? (
              // Goal values - width down 749.98px
              <>
                <button
                  disabled={isOpenModal && !isInfoOpen ? true : false}
                  onClick={toggleInfoOpen}
                  className="item__goalPrice btn"
                >
                  <div className="item__goalTitle">{t("Common.ModalPrice")}</div>
                  <div className="item__goalValue">{props.price}</div>
                  <div className="item__goalBtnClick">
                    {/* <HiCursorClick /> */}
                    <Click />
                  </div>
                </button>
                <div className={isInfoOpen ? "item__goalInfo active" : "item__goalInfo"}>
                  <>
                    <button onClick={toggleInfoOpen} className="item__goalClose">
                      <GrClose />
                    </button>
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
                    {width < 539.98 ? (
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
                                isDateAnimating
                                  ? "item__deadlineText active"
                                  : "item__deadlineText"
                              }
                            >
                              {isDate
                                ? width < 929.98
                                  ? `${
                                      deadlineDay.toString().length === 1
                                        ? `0${deadlineDay}`
                                        : deadlineDay
                                    }.${
                                      deadlineMonth.toString().length === 1
                                        ? `0${deadlineMonth}`
                                        : deadlineMonth
                                    }`
                                  : `${
                                      deadlineDay.toString().length === 1
                                        ? `0${deadlineDay}`
                                        : deadlineDay
                                    }.${
                                      deadlineMonth.toString().length === 1
                                        ? `0${deadlineMonth}`
                                        : deadlineMonth
                                    }.${deadlineYear}`
                                : `${daysToDeadline} d`}
                            </span>
                            <div className="item__clickSign">
                              {/* <HiCursorClick /> */}
                              <Click />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                </div>
              </>
            ) : (
              <>
                {/* Goal Values - Width down 749.98 px */}
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
              </>
            )}
          </div>
        ) : (
          <div className={theme === "dark" ? "item__amount dark" : "item__amount"}>
            {props.amount}
          </div>
        )}
        {props.type === "income" ||
        props.type === "income-sim" ||
        props.type === "savings_income" ? null : width < 539.98 &&
          props.type === "savings_goal" ? (
          ""
        ) : (
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
                    ? width < 929.98
                      ? `${
                          deadlineDay.toString().length === 1
                            ? `0${deadlineDay}`
                            : deadlineDay
                        }.${
                          deadlineMonth.toString().length === 1
                            ? `0${deadlineMonth}`
                            : deadlineMonth
                        }`
                      : `${
                          deadlineDay.toString().length === 1
                            ? `0${deadlineDay}`
                            : deadlineDay
                        }.${
                          deadlineMonth.toString().length === 1
                            ? `0${deadlineMonth}`
                            : deadlineMonth
                        }.${deadlineYear}`
                    : `${daysToDeadline} d`}
                </span>
                <div className="item__clickSign">
                  {/* <HiCursorClick /> */}
                  <Click />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        <div className="item__options">
          {width < 539.98 &&
          (props.type === "expense" || props.type === "expense-sim") ? (
            // RESPONSIVE SIZE
            <>
              {/* SLOT 1 */}
              <div className="item__edit">
                {props.done && props.permanent ? (
                  <Renew id={props.id} type={props.type} deadline={props.deadline} />
                ) : props.done && !props.permanent ? (
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

              {/* SLOT 2 */}
              <div className="item__delete">
                {/* ///////////////////// */}
                {/* ///////////////////// */}
                {props.done ? (
                  <Delete id={props.id} type={props.type} />
                ) : (
                  <Options
                    content={
                      <>
                        <div className="item__delete">
                          <Delete id={props.id} type={props.type} inModal={true} />
                        </div>
                        {props.type === "income" ||
                        props.type === "income-sim" ||
                        props.type === "savings_income" ? (
                          <div className="item__empty"></div>
                        ) : (
                          <div className={"item__done"}>
                            {props.done ? (
                              props.permanent ? (
                                <Renew
                                  id={props.id}
                                  type={props.type}
                                  deadline={props.deadline}
                                  inModal={true}
                                />
                              ) : (
                                ""
                              )
                            ) : (
                              <Done id={props.id} type={props.type} inModal={true} />
                            )}
                          </div>
                        )}
                      </>
                    }
                  />
                )}
                {/* ///////////////////// */}
                {/* ///////////////////// */}
              </div>
            </>
          ) : (
            // NORMAL SIZE
            <>
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
            </>
          )}
        </div>
      </>
    );
  }, [
    props,
    isDate,
    isOpenModal,
    isInfoOpen,
    isDateAnimating,
    isDescription,
    isAnimating,
    language,
    theme,
    width,
  ]);

  return (
    <div
      className={
        theme === "dark"
          ? props.type === "income" ||
            props.type === "income-sim" ||
            props.type === "savings_income"
            ? "item income dark"
            : props.type === "savings_goal"
            ? props.done
              ? "item goal finished dark"
              : daysToDeadline < 0 && props.deadline
              ? "item goal expired dark"
              : daysToDeadline >= 0 && daysToDeadline <= 3 && props.deadline
              ? "item goal close dark"
              : "item goal dark"
            : props.done
            ? "item finished dark"
            : daysToDeadline < 0 && props.deadline
            ? "item expired dark"
            : daysToDeadline >= 0 && daysToDeadline <= 3 && props.deadline
            ? "item close dark"
            : props.type === "expense" || props.type === "expense-sim"
            ? "item expense dark"
            : "item dark"
          : props.type === "income" ||
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
          : props.type === "expense" || props.type === "expense-sim"
          ? "item expense"
          : "item"
      }
    >
      {memoItem}
    </div>
  );
};

export default Item;

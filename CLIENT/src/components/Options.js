import React, { useState, useMemo } from "react";
import "./Options.scss";
import { useSelector, useDispatch } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { TOGGLE_MODAL } from "../actionTypes";
import { GrClose } from "react-icons/gr";

const Options = (props) => {
  const theme = useSelector((state) => state.theme.theme);
  const isOpenModal = useSelector((state) => state.items.isOpenModal);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // OPEN CLOSE DOTS MODAL

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    dispatch({
      type: TOGGLE_MODAL,
    });
  };

  const memoOptions = useMemo(() => {
    return (
      <div className={theme === "dark" ? "options dark" : "options"}>
        <button
          onClick={toggleOpen}
          disabled={isOpenModal && !isOpen ? true : ""}
          className="options__btn"
        >
          <HiDotsVertical />
        </button>
        <div className={isOpen ? "options__modal active" : "options__modal"}>
          <button onClick={toggleOpen} className="options__modalClose">
            <GrClose />
          </button>
          {props.content}
        </div>
      </div>
    );
  }, [isOpen, props, theme]);
  return <>{memoOptions}</>;
};

export default Options;

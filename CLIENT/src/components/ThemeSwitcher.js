import React, { useMemo } from "react";
import "./ThemeSwitcher.scss";
import { THEME_DARK, THEME_LIGHT } from "../actionTypes";
import { useDispatch, useSelector } from "react-redux";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const memoTheme = useMemo(() => {
    return (
      <>
        <div className="theme__title">
          <h3 className={theme === "dark" ? "theme__titleText dark" : "theme__titleText"}>
            Theme:
          </h3>
        </div>
        <div className="theme__opt1">
          <button
            onClick={() =>
              dispatch({
                type: THEME_DARK,
              })
            }
            className="theme__btn dark"
          ></button>
        </div>
        <div className="theme__opt2">
          <button
            onClick={() =>
              dispatch({
                type: THEME_LIGHT,
              })
            }
            className="theme__btn light"
          ></button>
        </div>
      </>
    );
  }, [theme]);

  return <div className="theme">{memoTheme}</div>;
};

export default ThemeSwitcher;

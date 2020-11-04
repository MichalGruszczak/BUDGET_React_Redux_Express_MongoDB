import React, { useMemo } from "react";
import "./LanguageSwitcher.scss";
import Flag from "react-flagkit";
import { useDispatch, useSelector } from "react-redux";
import { LANG_PL, LANG_ENG } from "../actionTypes";

const Language = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const memoLang = useMemo(() => {
    return (
      <>
        <div className="language__title">
          {console.log(language)}
          <h3>Language:</h3>
        </div>
        <div className="language__opt1">
          <button
            onClick={() =>
              dispatch({
                type: LANG_PL,
              })
            }
            className="language__btn"
          >
            <Flag className="language__flag" country={"PL"} />
          </button>
        </div>
        <div className="language__opt2">
          <button
            onClick={() =>
              dispatch({
                type: LANG_ENG,
              })
            }
            className="language__btn"
          >
            <Flag className="language__flag" country={"GB"} />
          </button>
        </div>
      </>
    );
  }, [language]);

  return <div className="language">{memoLang}</div>;
};

export default Language;

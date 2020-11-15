import React, { useMemo } from "react";
import "./LanguageSwitcher.scss";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation();
  const language = localStorage.getItem("i18nextLng");

  const memoLang = useMemo(() => {
    const handleClick = (lang) => {
      i18n.changeLanguage(lang);
    };

    return (
      <>
        <div className="language__title">
          <h3>{t("Settings.Language")}</h3>
        </div>
        <div className="language__opt1">
          <button onClick={() => handleClick("pl")} className="language__btn">
            <div className="language__btnFlag polish"></div>
          </button>
        </div>
        <div className="language__opt2">
          <button onClick={() => handleClick("en")} className="language__btn">
            <div className="language__btnFlag british"></div>
          </button>
        </div>
      </>
    );
  }, [language]);

  return <div className="language">{memoLang}</div>;
};

export default Language;

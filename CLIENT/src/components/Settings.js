import React from "react";
import "./Settings.scss";
import Footer from "./Footer";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from "react-redux";

const Settings = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="settings">
      <div
        className={theme === "dark" ? "settings__container dark" : "settings__container"}
      >
        <ThemeSwitcher />
      </div>
      <div
        className={theme === "dark" ? "settings__container dark" : "settings__container"}
      >
        <LanguageSwitcher />
      </div>

      <Footer type="info" />
    </div>
  );
};

export default Settings;

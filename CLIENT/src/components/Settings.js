import React from "react";
import "./Settings.scss";
import Footer from "./Footer";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings__container">
        <ThemeSwitcher />
      </div>
      <div className="settings__container">
        <LanguageSwitcher />
      </div>

      <Footer type="info" />
    </div>
  );
};

export default Settings;

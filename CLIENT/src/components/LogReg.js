import React, { useState } from "react";
import "./LogReg.scss";

const Register = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false);
  };

  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false);
  };

  return (
    <div className="logReg">
      {/* Login  */}
      <div className="logReg__login">
        <button onClick={toggleLogin} className="logReg__btn">
          Login
        </button>
        <div className={isLoginOpen ? "logReg__loginModal active" : "logReg__loginModal"}>
          <div
            className={isLoginOpen ? "logReg__background active" : "logReg__background"}
          >
            {/*  */}
            <button className="logReg__modalClose">X</button>
            <div className="logReg__modalLoading"></div>
            <div className="logReg__modalMain">
              <div className="logReg__fieldContainer">
                <div className="logReg__labelContainer">
                  <label className="logReg__label">Email</label>
                </div>
                <div className="logReg__inputContainer">
                  <input type="text" className="logReg__input" />
                </div>
                <div className="logReg__errorContainer">
                  <span className="logReg__error">Error!!!</span>
                </div>
              </div>
              <div className="logReg__fieldContainer">
                <div className="logReg__labelContainer">
                  <label className="logReg__label">Password</label>
                </div>
                <div className="logReg__inputContainer">
                  <input type="password" className="logReg__input" />
                </div>
                <div className="logReg__errorContainer">
                  <span className="logReg__error">Error!!!</span>
                </div>
              </div>
            </div>
            <div className="logReg__modalButton">
              <button className="logReg__btn">Sign In</button>
            </div>
            <div className="logReg__modalMessage">
              <h3>Message!</h3>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
      {/* // Login */}

      {/* Register */}
      <div className="logReg__register">
        <button onClick={toggleRegister} className="logReg__btn">
          Register
        </button>
        <div
          className={
            isRegisterOpen ? "logReg__registerModal active" : "logReg__registerModal"
          }
        >
          <div
            className={
              isRegisterOpen ? "logReg__background active" : "logReg__background"
            }
          >
            {/*  */}
            <button className="logReg__modalClose">X</button>
            <div className="logReg__modalLoading"></div>
            <div className="logReg__modalMain">
              <div className="logReg__fieldContainer">
                <div className="logReg__labelContainer">
                  <label className="logReg__label">Name</label>
                </div>
                <div className="logReg__inputContainer">
                  <input type="text" className="logReg__input" />
                </div>
                <div className="logReg__errorContainer">
                  <span className="logReg__error">Error!!!</span>
                </div>
              </div>
              <div className="logReg__fieldContainer">
                <div className="logReg__labelContainer">
                  <label className="logReg__label">Email</label>
                </div>
                <div className="logReg__inputContainer">
                  <input type="text" className="logReg__input" />
                </div>
                <div className="logReg__errorContainer">
                  <span className="logReg__error">Error!!!</span>
                </div>
              </div>
              <div className="logReg__fieldContainer">
                <div className="logReg__labelContainer">
                  <label className="logReg__label">Password</label>
                </div>
                <div className="logReg__inputContainer">
                  <input type="password" className="logReg__input" />
                </div>
                <div className="logReg__errorContainer">
                  <span className="logReg__error">Error!!!</span>
                </div>
              </div>
              <div className="logReg__fieldContainer">
                <div className="logReg__labelContainer">
                  <label className="logReg__label">Confirm password</label>
                </div>
                <div className="logReg__inputContainer">
                  <input type="password" className="logReg__input" />
                </div>
                <div className="logReg__errorContainer">
                  <span className="logReg__error">Error!!!</span>
                </div>
              </div>
            </div>

            <div className="logReg__modalButton">
              <button className="logReg__btn">Register</button>
            </div>
            <div className="logReg__modalMessage">
              <h3>Message!</h3>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
      {/* // Register */}
    </div>
  );
};

export default Register;

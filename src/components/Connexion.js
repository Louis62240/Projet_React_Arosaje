import React, { useState } from "react";
import "../assets/css/Connexion.css";

const Connexion = ({ onConnect }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleClick = () => {
    onConnect();
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleHideRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <>
      <div className="BodyConnexion">
        <img
          src={require("../assets/img/logo.png")}
          alt="Logo"
          className="logo"
          height={100}
        />
        <div className="login-page">
          <div className="form">
            {showRegisterForm ? (
              <form className="register-form">
                <input type="text" placeholder="name" />
                <input type="password" placeholder="password" />
                <input type="text" placeholder="email address" />
                <button>create</button>
                <p className="message">
                  Already registered?{" "}
                  <a href="#" onClick={handleHideRegisterForm}>
                    Sign In
                  </a>
                </p>
              </form>
            ) : (
              <form className="login-form">
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button onClick={handleClick}>login</button>
                <p className="message">
                  Not registered?{" "}
                  <a href="#" onClick={handleShowRegisterForm}>
                    Create an account
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Connexion;

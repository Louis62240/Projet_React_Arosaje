import React, { useState } from "react";
import "../assets/css/Connexion.css";
import getPlantes from '../services/api'

const Connexion = ({ onConnect }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleClick = () => {
    onConnect();
  };

  getPlantes()
  .then(data => {
    // Utiliser les données retournées par la fonction getUsers
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });


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
                <input type="password" placeholder="mot de passe" />
                <input type="text" placeholder="email" />
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
                <input type="text" placeholder="Adresse mail" />
                <input type="password" placeholder="Mot de passe" />
                <button onClick={handleClick}>Se connecter</button>
                <p className="message">
                  Vous n'avez pas de compte?{" "}
                  <a href="#" onClick={handleShowRegisterForm}>
                    S'inscrire
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

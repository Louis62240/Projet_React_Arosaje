import React, { useState } from "react";
import "../assets/css/Header.css";
import Accueil from "./Accueil.js";
import VosPlantes from "./VosPlantes.js";
import Profil from "./Profil.js";

const Header = ({ onDisconnect}) => {
  const [showAccueil, setShowAccueil] = useState(true);
  const [showVosPlantes, setShowVosPlantes] = useState(false);
  const [showProfil, setShowProfil] = useState(false);

  useState(() => {
    setShowAccueil(true);
    setShowVosPlantes(false);
    setShowProfil(false);
  }, []);

  if (showAccueil) {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
          integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
          crossorigin="anonymous"
        />
        <div style={{ backgroundColor: "mediumseagreen" }} light expand="md">
          <div className="displayFlexAttributes">
            <img
              src={require("../assets/img/logo.png")}
              alt="Logo"
              className="logo"
              height={100}
            />
            <div className="PlacementMenu d-flex align-items-center">
              <div>
                <div
                  style={{ textDecoration: "underline" }}
                  className="NavMenuLink"
                  onClick={() => {
                    setShowAccueil(true);
                    setShowVosPlantes(false);
                    setShowProfil(false);
                  }}
                >
                  Accueil
                </div>
              </div>
              <div>
                <div
                  className="NavMenuLink"
                  onClick={() => {
                    setShowAccueil(false);
                    setShowVosPlantes(true);
                    setShowProfil(false);
                  }}
                >
                  Vos Plantes
                </div>
              </div>
            </div>
            <div className="PlacementUser">
              <i
                onClick={() => {
                  setShowAccueil(false);
                  setShowVosPlantes(false);
                  setShowProfil(true);
                }}
                className="PlacementElementUser fas fa-user fa-2x"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2)";
                  e.target.style.transition = "0.5s";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.transform = "0.5s";
                }}
              ></i>
              <a className="PlacementElementUser" onClick={onDisconnect}>
                <img
                  src={require("../assets/img/sign-out.png")}
                  alt="Logo"
                  className="logo"
                  height={35}
                />
              </a>
              <div>
                <i
                  onClick={() => {
                    setShowAccueil(false);
                    setShowVosPlantes(false);
                    setShowProfil(true);
                  }}
                  className="PlacementElementUser fas fa-sign-out fa-2x"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.transition = "0.5s";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.transform = "0.5s";
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <Accueil setShowAccueil={setShowAccueil} setShowProfil={setShowProfil} setShowVosPlantes={setShowVosPlantes}/>
      </>
    );
  } else if (showVosPlantes) {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
          integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
          crossorigin="anonymous"
        />
        <div style={{ backgroundColor: "mediumseagreen" }} light expand="md">
          <div className="displayFlexAttributes">
            <img
              src={require("../assets/img/logo.png")}
              alt="Logo"
              className="logo"
              height={100}
            />
            <div className="PlacementMenu d-flex align-items-center">
              <div>
                <div
                  
                  className="NavMenuLink"
                  onClick={() => {
                    setShowAccueil(true);
                    setShowVosPlantes(false);
                    setShowProfil(false);
                  }}
                >
                  Accueil
                </div>
              </div>
              <div>
                <div
                  style={{ textDecoration: "underline" }}
                  className="NavMenuLink"
                  onClick={() => {
                    setShowAccueil(false);
                    setShowVosPlantes(true);
                    setShowProfil(false);
                  }}
                >
                  Vos Plantes
                </div>
              </div>
            </div>
            <div className="PlacementUser">
              <i
                onClick={() => {
                  setShowAccueil(false);
                  setShowVosPlantes(false);
                  setShowProfil(true);
                }}
                className="PlacementElementUser fas fa-user fa-2x"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2)";
                  e.target.style.transition = "0.5s";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.transform = "0.5s";
                }}
              ></i>
              <a className="PlacementElementUser" onClick={onDisconnect}>
                <img
                  src={require("../assets/img/sign-out.png")}
                  alt="Logo"
                  className="logo"
                  height={35}
                />
              </a>
              <div>
                <i
                  onClick={() => {
                    setShowAccueil(false);
                    setShowVosPlantes(false);
                    setShowProfil(true);
                  }}
                  className="PlacementElementUser fas fa-sign-out fa-2x"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.transition = "0.5s";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.transform = "0.5s";
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className="animated-div">
          <VosPlantes />
        </div>
      </>
    );
  } else if (showProfil) {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
          integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
          crossorigin="anonymous"
        />
        <div style={{ backgroundColor: "mediumseagreen" }} light expand="md">
          <div className="displayFlexAttributes">
            <img
              src={require("../assets/img/logo.png")}
              alt="Logo"
              className="logo"
              height={100}
            />
            <div className="PlacementMenu d-flex align-items-center">
              <div>
                <div
                  className="NavMenuLink"
                  onClick={() => {
                    setShowAccueil(true);
                    setShowVosPlantes(false);
                    setShowProfil(false);
                  }}
                >
                  Accueil
                </div>
              </div>
              <div>
                <div
                  className="NavMenuLink"
                  onClick={() => {
                    setShowAccueil(false);
                    setShowVosPlantes(true);
                    setShowProfil(false);
                  }}
                >
                  Vos Plantes
                </div>
              </div>
            </div>
            <div className="PlacementUser">
              <i
                onClick={() => {
                  setShowAccueil(false);
                  setShowVosPlantes(false);
                  setShowProfil(true);
                }}
                className="PlacementElementUser fas fa-user fa-2x"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.2)";
                  e.target.style.transition = "0.5s";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.transform = "0.5s";
                }}
              ></i>
              <a className="PlacementElementUser" onClick={onDisconnect}>
                <img
                  src={require("../assets/img/sign-out.png")}
                  alt="Logo"
                  className="logo"
                  height={35}
                />
              </a>
              <div>
                <i
                  onClick={() => {
                    setShowAccueil(false);
                    setShowVosPlantes(false);
                    setShowProfil(true);
                  }}
                  className="PlacementElementUser fas fa-sign-out fa-2x"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.2)";
                    e.target.style.transition = "0.5s";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.transform = "0.5s";
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <Profil />
      </>
    );
  }
};

export default Header;

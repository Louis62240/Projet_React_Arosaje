import React, { useState ,useEffect} from "react";
import "../assets/css/Header.css";
import Accueil from "./Accueil.js";
import VosPlantes from "./VosPlantes.js";
import Profil from "./Profil.js";
import { getUserId } from "../services/api";

const Header = ({ onDisconnect}) => {
  const [showAccueil, setShowAccueil] = useState(true);
  const [showVosPlantes, setShowVosPlantes] = useState(false);
  const [showProfil, setShowProfil] = useState(false);

  
  const [nomUser, setNomUser] = useState("");
  const [mailUser, setMailUser] = useState("");
  const [telUser, setTelUser] = useState("");

  useState(() => {
    setShowAccueil(true);
    setShowVosPlantes(false);
    setShowProfil(false);
  }, []);

  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    if (utilisateur) {
      setNomUser(utilisateur.utilisateur[1]);
      setMailUser(utilisateur.utilisateur[4]);
      setTelUser(utilisateur.utilisateur[3]);
    }
  }, []);
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
        <div className="navbarHeader" light expand="md">
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
                  className={`NavMenuLink ${showAccueil ? 'active' : ''}`}
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
                  className={`NavMenuLink ${showVosPlantes ? 'active' : ''}`}
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
              <p className="PlacementElementUser">{nomUser}</p>
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
        {showAccueil && <Accueil setShowAccueil={setShowAccueil} setShowProfil={setShowProfil} setShowVosPlantes={setShowVosPlantes}/>}
      {showVosPlantes && <VosPlantes />}
      {showProfil && <Profil />}
      </>
    );
};

export default Header;
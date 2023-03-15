import React, { useState , useEffect} from "react";
import "../assets/css/Profil.css";
import { updateUser } from "../services/api";

const Profil = () => {
  const [nomUser, setNomUser] = useState("");
  const [mailUser, setMailUser] = useState("");
  const [telUser, setTelUser] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    if (utilisateur) {
      setNomUser(utilisateur.utilisateur[1]);
      setMailUser(utilisateur.utilisateur[4]);
      setTelUser(utilisateur.utilisateur[3]);
      setUserId(utilisateur.utilisateur[0]);
      
    }
  }, []);

  const handleSaveProfile = async () => {
    const updatedUser = await updateUser(userId, nomUser, telUser, mailUser);
    if (updatedUser.status === "success") {
      alert("Profil mis à jour avec succès !");
    } else {
      alert("Une erreur est survenue lors de la mise à jour du profil.");
    }
  };

  return (
    <>
      <div className="animated-div">
        <div class="container rounded bg-white mt-5 mb-5">
          <div class="row">
            <div class="col-md-3 border-right">
              <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                <span class="font-weight-bold">{nomUser}</span>
                <span class="text-black-50">{mailUser}</span>
                <span> </span>
              </div>
            </div>
            <div class="col-md-5 border-right">
              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h4 class="text-right">Profil de {nomUser}</h4>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6">
                    <label class="labels">Nom</label>
                    <input type="text" class="form-control" placeholder="Nom" value={nomUser} onChange={(e) => setNomUser(e.target.value)} />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labels">Numéro de téléphone</label>
                    <input type="text" class="form-control" placeholder="Entrer votre numéro de téléphone" value={telUser} onChange={(e) => setTelUser(e.target.value)} />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Adresse e-mail</label>
                    <input type="text" class="form-control" placeholder="Entrez votre email" value={mailUser} onChange={(e) => setMailUser(e.target.value)} />
                  </div>
                </div>
                <div class="mt-5 text-center">
                  <button class="buttonSaveProfil btn btn-primary profile-button" type="button" onClick={handleSaveProfile}>Sauvegarder votre profil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default Profil;

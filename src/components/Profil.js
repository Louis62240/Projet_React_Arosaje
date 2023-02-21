import React from "react";
import "../assets/css/Profil.css";
const Profil = () => {
    return (
        <>
            <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">Louisito</span><span class="text-black-50">louisleplusbeau@gmail.com</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profil</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Prénom</label><input type="text" class="form-control" placeholder="Prénom" value=""/></div>
                    <div class="col-md-6"><label class="labels">Nom</label><input type="text" class="form-control" value="" placeholder="Nom"/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Numéro de téléphone</label><input type="text" class="form-control" placeholder="Entrer votre numéro de téléphone" value=""/></div>
                    <div class="col-md-12"><label class="labels">Adresse</label><input type="text" class="form-control" placeholder="Entrez votre adresse" value=""/></div>
                    <div class="col-md-12"><label class="labels">Code postal</label><input type="text" class="form-control" placeholder="Entrez votre code postal" value=""/></div>
                    <div class="col-md-12"><label class="labels">Département</label><input type="text" class="form-control" placeholder="Entrez votre département" value=""/></div>
                    <div class="col-md-12"><label class="labels">Région</label><input type="text" class="form-control" placeholder="Entrez votre région" value=""/></div>
                    <div class="col-md-12"><label class="labels">Adresse e-mail</label><input type="text" class="form-control" placeholder="Entrez votre email" value=""/></div>
                </div>
                <div class="mt-5 text-center"><button class="buttonSaveProfil btn btn-primary profile-button" type="button">Sauvegarder votre profil</button></div>
            </div>
        </div>
    </div>
</div>

        </>
    );
    }

export default Profil;
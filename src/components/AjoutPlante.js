import React, { useState } from "react";
import { addPlante , addPhoto, addConseil} from "../services/api";
import "../assets/css/AjouterPlante.css";
import PrendrePhoto from "./PrendrePhoto";
import ProgressBar from "./ProgressBar";
const AjoutPlante = ({ setShowAccueil,setShowVosPlantes,setShowProfil }) => {
  const [proprietaireId, setProprietaireId] = useState("");
  const [nomPlante, setNomPlante] = useState("");
  const [descriptionPlante, setDescriptionPlante] = useState("");
  const [conseilPlante, setConseilPlante] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [afficherDeuxiemeFormulaire, setAfficherDeuxiemeFormulaire] = useState(false);
  const [afficherTroisiemeFormulaire, setAfficherTroisiemeFormulaire] = useState(false);
  const [idPlante, setIdPlante] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleClickAfter = () => {
    setShowAccueil(true);
  };
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // Récupère les coordonnées de l'utilisateur
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Appelle l'API OpenCage Geocoder pour obtenir le nom de la ville correspondant aux coordonnées
      const apiKey = '506c483206104e4eb57141fd064060a6';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=fr&pretty=1`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Met à jour le state avec le nom de la ville
          const localisation = data.results[0].components.city;
          setLocalisation(localisation);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(localisation);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
        const response = await addPlante(
          proprietaireId,
          nomPlante,
          descriptionPlante,
          localisation,
        );
        console.log(response); // affiche les données dans la console
        alert("Plante ajoutée avec succès");
        setIdPlante(response.id);
        handleNext();
      } catch (error) {
        console.log(error);
      }
    if (afficherDeuxiemeFormulaire) {
      
     
    } else {
      setAfficherDeuxiemeFormulaire(true);
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
};

  const uploadData = (base64String) => {
    // Code pour envoyer la chaîne de caractères base64 au serveur
    setSelectedFile(base64String);

  };


  const handleSubmit2 = async (event) => {
    event.preventDefault();
    // Code pour envoyer le fichier vers le serveur
    try {
      
      const response = await addPhoto(
        selectedFile,
        idPlante,
      );
      alert("Photo ajoutée avec succès");
      setAfficherTroisiemeFormulaire(true);
      setAfficherDeuxiemeFormulaire(true);
      handleNext();
      console.log(afficherDeuxiemeFormulaire + " " + afficherTroisiemeFormulaire)
      console.log(response); // affiche les données dans la console


    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit3 = async (event) => {
    event.preventDefault();
    
    try {
      const response = await addConseil(
        idPlante,
        conseilPlante
      );
      setShowAccueil(true);
      setShowVosPlantes(false);
      setShowProfil(false);
        alert("Conseil ajouté avec succès");
        handleClickAfter();
    } catch (error) {
      console.log(error);
    }
  };
    


  return (
    <>
      <ProgressBar currentStep={currentStep} />

    <div className='formulaireAjoutPlante'>
      {!afficherDeuxiemeFormulaire && !afficherTroisiemeFormulaire &&  (
      <form onSubmit={handleSubmit}>
        <div>
          <label className='labelAjout' htmlFor="proprietaireId">Propriétaire ID:</label>
          <input className='InputAjout'
            type="text"
            id="proprietaireId"
            value={proprietaireId}
            onChange={(event) => setProprietaireId(event.target.value)}
          />
        </div>
        <div>
          <label className='labelAjout' htmlFor="nomPlante">Nom de la plante:</label>
          <input className='InputAjout'
            type="text"
            id="nomPlante"
            value={nomPlante}
            onChange={(event) => setNomPlante(event.target.value)}
          />
        </div>
        <div>
          <label className='labelAjout' htmlFor="descriptionPlante">Description de la plante:</label>
          <input className='InputAjout'
            type="text"
            id="descriptionPlante"
            value={descriptionPlante}
            onChange={(event) => setDescriptionPlante(event.target.value)}
          />
        </div>
        <div>
          <label className='labelAjout' htmlFor="localisation" value={localisation} onChange={(event) => setLocalisation(event.target.value)} >Localisation:</label>
          <input className='InputAjout'
            type="text"
            id="localisation"
            value={localisation}
            onChange={(event) => setLocalisation(event.target.value)}
          />
              <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={handleGetLocation}>
                    Obtenir la localisation
                  </button>
                </div>
        </div>
        <div className="PlacementButton">
          <button className="buttonAddPlante" type="submit">
            Suivant
          </button>
        </div>
      </form>
      )}
      {afficherDeuxiemeFormulaire && !afficherTroisiemeFormulaire &&(
        <><PrendrePhoto></PrendrePhoto>
        <div className="add-image-container">
        <form onSubmit={handleSubmit2}>
          <div className="form-group">
            <label htmlFor="file-upload" className="custom-file-upload">
              Sélectionner un fichier
            </label>
            <input 
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div className="preview-image-container">
          {selectedFile && (
            <img
              className="preview-image"
              src={URL.createObjectURL(selectedFile)}
              alt="Prévisualisation"
            />
          )}
        </div>
        <div className="PlacementButton">
          <button className="buttonAddPlante" type="submit">Suivant</button>
        </div>
        </form>
       
      </div>
      </>
      )}
      {afficherTroisiemeFormulaire && afficherDeuxiemeFormulaire &&  (
 <>      <div className="add-image-container">
       <form onSubmit={handleSubmit3}>
         <div className="form-group">
         <div>
          <label className='labelAjout' htmlFor="conseilPlante">Conseil pour la plante:</label>
          <input className='InputAjout'
            type="textarea"
            id="conseilPlante"
            value={conseilPlante}
            onChange={(event) => setConseilPlante(event.target.value)}
          />
        </div>
        </div>
       <div className="PlacementButton">
         <button className="buttonAddPlante" type="submit">Envoyer</button>
       </div>
       </form>
      
     </div> </>
      )}
    </div></>
  );
  
};

export default AjoutPlante;

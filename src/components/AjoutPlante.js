import React, { useState } from "react";
import { addPlante , addPhoto} from "../services/api";
import "../assets/css/AjouterPlante.css";

const AjoutPlante = () => {
  const [proprietaireId, setProprietaireId] = useState("");
  const [nomPlante, setNomPlante] = useState("");
  const [descriptionPlante, setDescriptionPlante] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [afficherDeuxiemeFormulaire, setAfficherDeuxiemeFormulaire] = useState(false);
  const [idPlante, setIdPlante] = useState("");

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
    setSelectedFile(event.target.files[0]);
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
      console.log(response); // affiche les données dans la console

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>

    <div className='formulaireAjoutPlante'>
      {!afficherDeuxiemeFormulaire && (
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
          <label className='labelAjout' htmlFor="localisation">Localisation:</label>
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
      {afficherDeuxiemeFormulaire && (
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
          <button className="buttonAddPlante" type="submit">Envoyer</button>
        </div>
        </form>
       
      </div>
      )}
    </div></>
  );
  
};

export default AjoutPlante;

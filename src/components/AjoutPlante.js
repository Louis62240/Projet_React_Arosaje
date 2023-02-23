import React, { useState } from "react";
import { addPlante } from "../services/api";
import "../assets/css/AjouterPlante.css";

const AjoutPlante = () => {
  const [proprietaireId, setProprietaireId] = useState("");
  const [nomPlante, setNomPlante] = useState("");
  const [descriptionPlante, setDescriptionPlante] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [afficherDeuxiemeFormulaire, setAfficherDeuxiemeFormulaire] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (afficherDeuxiemeFormulaire) {
      try {
        // Ajouter la plante et l'image ici
      } catch (error) {
        console.log(error);
      }
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
  };


  return (
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
        </div>
        <div className="PlacementButton">
          <button className="buttonAdd" type="submit">
            {afficherDeuxiemeFormulaire ? "Ajouter la plante et l'image" : "Suivant"}
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
          <button className="buttonAdd" type="submit">Envoyer</button>
        </form>
        <div className="preview-image-container">
          {selectedFile && (
            <img
              className="preview-image"
              src={URL.createObjectURL(selectedFile)}
              alt="Prévisualisation"
            />
          )}
        </div>
      </div>
      )}
    </div>
  );
};

export default AjoutPlante;

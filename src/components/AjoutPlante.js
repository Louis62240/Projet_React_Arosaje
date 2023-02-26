import React, { useState , useEffect} from "react";
import { addPlante , addPhoto, addConseil} from "../services/api";
import "../assets/css/AjouterPlante.css";
import PrendrePhoto from "./PrendrePhoto";
import ProgressBar from "./ProgressBar";
import {Alert } from "react-bootstrap";
const AjoutPlante = ({ setIsVisible }) => {
  const [proprietaireId, setProprietaireId] = useState("");
  const [nomPlante, setNomPlante] = useState("");
  const [descriptionPlante, setDescriptionPlante] = useState("");
  const [conseilPlante, setConseilPlante] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [afficherDeuxiemeFormulaire, setAfficherDeuxiemeFormulaire] = useState(false);
  const [afficherTroisiemeFormulaire, setAfficherTroisiemeFormulaire] = useState(false);
  const [idPlante, setIdPlante] = useState("");
  const [idUser , setIdUser] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showAlert4, setShowAlert4] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [showAlert6, setShowAlert6] = useState(false);


  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    if (utilisateur) {
      setProprietaireId(utilisateur.utilisateur[0]);
    }
  }, []);

  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    if (utilisateur) {
      setIdUser(utilisateur.utilisateur[0]);
    }
  }, []);

  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
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
    });
  };
  const handleButtonToAccueil = () => {
    setIsVisible(false);
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
        setIdPlante(response.id);
        handleNext();
        setShowAlert(true);        
      } catch (error) {
        console.log(error);
        setShowAlert2(true);
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
      setShowAlert(false)
      setShowAlert3(true);
      setAfficherTroisiemeFormulaire(true);
      setAfficherDeuxiemeFormulaire(true);
      handleNext();
    } catch (error) {
      console.log(error);
       setShowAlert2(false); 
      setShowAlert4(true);
    }
  };
  const handleSubmit3 = async (event) => {
    event.preventDefault();
    
    try {
      const response = await addConseil(
        idPlante,
        conseilPlante
      );
      setShowAlert3(false)
      setShowAlert5(true);
      handleButtonToAccueil();
    } catch (error) {
      setShowAlert4(false)
      setShowAlert6(true);
      console.log(error);
    }
  };
    


  return (
    <>
      <ProgressBar currentStep={currentStep} />
    <div className='formulaireAjoutPlante'>
    {showAlert && (
        <Alert color="success">
       Votre Plante a bien été ajoutée, vous pouvez maintenant ajouter une photo !
      </Alert>
      )}
      {showAlert2 && (
        <Alert color="danger">
          Votre Plante n'a pas été ajoutée, veuillez réessayer !
          </Alert>
      )}
      {showAlert3 && (
        <Alert color="success">
          Votre photo a bien été ajoutée, vous pouvez maintenant ajouter un conseil !
          </Alert>
          )}
      {showAlert4 && (
        <Alert color="danger">
          Votre photo n'a pas été ajoutée, veuillez réessayer !
          </Alert>
      )}
      {showAlert5 && (
        <Alert color="success">
          Votre conseil a bien été ajouté, vous pouvez maintenant consulter votre profil !
          </Alert>
      )}
      {showAlert6 && (
        <Alert color="danger">
          Votre conseil n'a pas été ajouté, veuillez réessayer !
          </Alert>
      )}
      {!afficherDeuxiemeFormulaire && !afficherTroisiemeFormulaire &&  (
      <form onSubmit={handleSubmit}>
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
            type="textarea"
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
          <button className="buttonAddPlante btn btn-outline-success my-2 my-sm-0" type="submit">
            Suivant
          </button>
        </div>
      </form>
      )}
      {afficherDeuxiemeFormulaire && !afficherTroisiemeFormulaire &&(
        <><PrendrePhoto  setSelectedFile={setSelectedFile} ></PrendrePhoto>
        <p>Vous souhaitez insérer votre photo :</p>
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
          <button className="buttonAddPlante btn btn-outline-success my-2 my-sm-0" type="submit">Suivant</button>
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
         <button className="buttonAddPlante btn btn-outline-success my-2 my-sm-0" type="submit">Envoyer</button>
       </div>
       </form>
      
     </div> </>
      )}
    </div></>
  );
  
};

export default AjoutPlante;

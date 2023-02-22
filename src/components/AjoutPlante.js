import React, { useState } from "react";
import "../assets/css/AjouterPlante.css";
import {addPlante} from '../services/api'

const AjoutPlante = () => {
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      // Récupère les coordonnées de l'utilisateur
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Appelle l'API OpenCage Geocoder pour obtenir le nom de la ville correspondant aux coordonnées
      const apiKey = "506c483206104e4eb57141fd064060a6";
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=fr&pretty=1`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Met à jour le state avec le nom de la ville
          const city = data.results[0].components.city;
          setCity(city);
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(city);
    });
  };

  return (
    <>
      <form className="formulaireAjoutPlante">
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Photo de la plante</label>
          <div className='PlacementImageBouton'>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            onChange={handleImageChange}
          />
          <div className="image-container">
            {image && <img src={image} alt="Plante" />}
          </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Type de plante</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Entrer le type de plante"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description :</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="validationServer03">Ville</label>
            <div className="PlacementLocalisation">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="validationServer03"
                  placeholder="Ville"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleGetLocation}
                  >
                    Obtenir la localisation
                  </button>
                </div>
              </div>
              <div className="invalid-feedback">
                Veuillez entrer une ville valide.
              </div>
            </div>
          </div>
        </div>

        <div className="PlacementButton">
          <div className="marginLeftAuto">
            <button className="buttonAdd">Ajouter sa plante</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AjoutPlante;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/css/Map.css";
import { getPlantes, getPlantesByVille, getPlanteById,updatePlanteGardien } from "../services/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const positionLille = [50.62925, 3.057256]; // position par défaut pour centrer la carte

function WorldMap() {
  const [positions, setPositions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plantes, setPlantes] = useState([]);
  const [selectedPlante, setSelectedPlante] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [PlanteNameSelected, setPlanteNameSelected] = useState("");
  const [PlanteDescriptionSelected, setPlanteDescriptionSelected] =
    useState("");
  const [PlanteLocalisationSelected, setPlanteLocalisationSelected] =
    useState("");
  const [PlanteConseilSelected, setPlanteConseilSelected] = useState("");
  const [PlanteProprietaire, setPlanteProprietaire] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [PhotoPlanteSelected, setPhotoPlanteSelected] = useState("");
  const [ville, setVille] = useState("");
 const [markerLoading, setMarkerLoading] = useState(false);
 const [show, setShow] = useState(false);
 const mapClose = () => setActive(false);
 const [mapURL, setMapURL] = useState("");
 const [active, setActive] = useState(false);
 const [idPlanteSelected, setIdPlanteSelected] = useState("");
const [LoaderMap , setLoaderMap] = useState(false);
console.log("LoaderMap : " + LoaderMap)
 useEffect(() => {
    getPlantes().then((data) => {
      setPlantes(data);
      console.log("Plantes");
      console.log(data);
    });
  }, []);
  const addGardien = () => {
    // plante est un tableau contenant les informations de la plante
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    console.log('Id plante :'+ idPlanteSelected)
    updatePlanteGardien(idPlanteSelected,utilisateur.utilisateur[0]);
    handleClose();
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleMarkerClick(plante) {
    setSelectedCity(plante.localisation);
    getPlantesByVille(plante.localisation)
      .then((data) => {
        setSelectedPlante({
          ...plante,
          plantes: data,
        });
        setShowMoreInfo(true);

      })
      .catch((error) => {
        console.error(error);
      });
  }
  const recupDataPlante = (plante) => {
    // plante est un tableau contenant les informations de la plante
    const id = plante.id_plante;
    getPlanteById(id)
      .then((data) => {
        // Mettre à jour les variables d'état avec les informations de la plante sélectionnée
        console.log(data);
        setIdPlanteSelected(id);
        setPhotoPlanteSelected(data.photo_url);
        setPlanteNameSelected(data.nom_plante);
        setPlanteDescriptionSelected(data.description_plante);
        setPlanteLocalisationSelected(data.localisation);
        setPlanteConseilSelected(data.conseil);
        setPlanteProprietaire(data.nom_proprietaire);
        setVille(data.localisation);
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const promises = plantes.map((plante) =>
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${plante.localisation}&format=json&limit=1`
      )
        .then((response) => response.json())
        .then((data) => [parseFloat(data[0].lat), parseFloat(data[0].lon)])
    );

    Promise.all(promises)
      .then((positions) => {
        setPositions(positions);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [plantes]);

  if (loading) {
    return (
      <div style={{ display: "flex" }}>
        <p style={{ margin: "auto", marginTop: "200px" }}>Chargement..</p>
      </div>
    );
  }
  if(positions.length > 0)
  {
    console.log("positions : " + positions.length)
    if(LoaderMap == false)
    {
    setLoaderMap(true);
    }
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const markers =
  
  positions.map((position, index) => (
    <Marker
      key={index}
      position={position}
      eventHandlers={{
        click: () => {
          handleMarkerClick(plantes[index]);
        },
      }}
    >
      <Popup>
        {selectedPlante && (
          <div style={{ fontSize: "15px" }}>
            <p>Plantes à {selectedCity}</p>
            <ul>
              {selectedPlante.plantes.map((plante) => (
                <li key={plante.id_plante}>{plante.nom_plante}</li>
              ))}
            </ul>
          </div>
        )}
      </Popup>
    </Marker>
  )
  );
                
  return (
    <div className="animated-div">
      <div style={{ display: "flex" }}>
        
        <MapContainer
          style={{
            height: "600px",
            width: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
          center={positionLille}
          zoom={6}
          scrollWheelZoom={false}
        >
          {LoaderMap && <span class="loader"></span>}
          
        
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      </div>
      

      {showMoreInfo && (<div className="animated-div">
        <div style={{marginTop:'20px'}}>
                      <div className="PlanteBrique">

          {selectedPlante.plantes.map((plante) => (
            <div className="PlanteBriqueInside card" style={{ width: "18rem",height:'25rem' }}>
              <img
                src={
                  plante.photo_url
                    ? `data:image/jpeg;base64,${plante.photo_url}`
                    : require("../assets/img/plante.jpg")
                }
                className="ImagePlante card-img-top"
                alt="..."
              />
              <button className="positionLocalisation" data-toggle="modal">
                <img
                  src={require("../assets/img/localisation.png")}
                  className="imgLocalisation"
                />
                {plante.localisation}
              </button>
              <div className="card-body">
                <h5 className="card-title">{plante.nom_plante}</h5>
                <div>
                  <p className="description card-text">
                    Description : {plante.description_plante}
                  </p>
                  <button
                    className="buttonEnSavoirPlus btn btn-outline-success my-2 my-sm-10"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      recupDataPlante(plante);
                    }}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
           {/* Affiche un pop up avec les informations sur la plante */}
           <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{PlanteNameSelected}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={
                    PhotoPlanteSelected
                      ? `data:image/jpeg;base64,${PhotoPlanteSelected}`
                      : require("../assets/img/plante.jpg")
                  }
                  class="card-img top"
                />
                Proprietaire : {PlanteProprietaire}
                <br />
                <br />
                Description : {PlanteDescriptionSelected}
                <br />
                <br />
                Localisation : {PlanteLocalisationSelected}
                <br />
                <br />
                Conseil : {PlanteConseilSelected}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fermer
                </Button>
                <Button
                  style={{ background: "#28a745 " }}
                  onClick={addGardien}
                >
                  Garder cette plante
                </Button>
              </Modal.Footer>
            </Modal>

            {/*Affiche un pop up avec les informations sur la localisation */}
            <Modal show={active} onHide={mapClose}>
              <Modal.Header closeButton>
                <Modal.Title>{ville}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Localisation : {ville}
                <br />
                <div
                  className="map-container"
                  onChange={(event) => setMapURL(event.target.value)}
                >
                  {mapURL ? (
                    <iframe
                      width="100%"
                      height="300px"
                      src={mapURL}
                      title="Ville Map"
                      onChange={(event) => setMapURL(event.target.value)}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={mapClose}>
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
        </div>
      )}
      
    </div>
  );
}

export default WorldMap;

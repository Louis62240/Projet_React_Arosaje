import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../assets/css/Map.css";
import { getPlantes, getPlantesByVille, getPlanteById } from "../services/api";

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
  useEffect(() => {
    getPlantes().then((data) => {
      setPlantes(data);
      console.log("Plantes");
      console.log(data);
    });
  }, []);

  function handleMoreInfoClick() {
    setShowMoreInfo(true);
  }
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
        setPhotoPlanteSelected(data.photo_url);
        setPlanteNameSelected(data.nom_plante);
        setPlanteDescriptionSelected(data.description_plante);
        setPlanteLocalisationSelected(data.localisation);
        setPlanteConseilSelected(data.conseil);
        setPlanteProprietaire(data.nom_proprietaire);
        setVille(data.localisation);
        // handleShow();
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
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      </div>
      {showMoreInfo && (
        <div style={{marginTop:'20px'}}>
                      <div className="PlanteBrique">

          {selectedPlante.plantes.map((plante) => (
            <div className="PlanteBriqueInside card" style={{ width: "18rem" }}>
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
        </div>
      )}
      
    </div>
  );
}

export default WorldMap;

import React, { useState , useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import AjoutPlante from "./AjoutPlante";
import "../assets/css/Accueil.css";
import {getPlantes,getPlanteById} from '../services/api'

const Accueil = ({setShowAccueil,setShowProfil,setShowVosPlantes}) => {
  const [plantes, setPlantes] = useState([]);
  useEffect(() => {
    getPlantes().then(data => {
      setPlantes(data);
      console.log(data)
    });
  }, []);


  const [image, setImage] = useState(null);

  const [PlanteNameSelected, setPlanteNameSelected] = useState("");
  const [PlanteDescriptionSelected, setPlanteDescriptionSelected] =
    useState("");
  const [PlanteLocalisationSelected, setPlanteLocalisationSelected] =
    useState("");
  const [PlanteConseilSelected, setPlanteConseilSelected] = useState("");
  const [PlanteProprietaire, setPlanteProprietaire] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [ville, setVille] = useState("");

  const [mapURL, setMapURL] = useState("");


    const recupDataPlante = (plante) => {
      // plante est un tableau contenant les informations de la plante
      const id = plante.id_plante;
      getPlanteById(id)
        .then((data) => {
          // Mettre à jour les variables d'état avec les informations de la plante sélectionnée
          setPlanteNameSelected(data.nom_plante);
          setPlanteDescriptionSelected(data.localisation);
          setPlanteLocalisationSelected(data.description_plante);
          setPlanteConseilSelected(data.conseil);
          setPlanteProprietaire(data.nom_proprietaire);
          setVille(data.localisation);
          handleShow();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const recupLocalisation = (plante) => {
      // plante est un tableau contenant les informations de la plante
      const id = plante.id_plante;
      getPlanteById(id)
        .then((data) => {
          // Mettre à jour les variables d'état avec les informations de la plante sélectionnée
          setVille(data.localisation);
          mapShow();
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleGetLocation = (ville, plante) => {

    ville = ville.toLowerCase();

    /*const apiKey = '506c483206104e4eb57141fd064060a6';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${ville}&key=${apiKey}&language=fr&pretty=1`;

    console.log("URL :");
    console.log(url);
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry;
      })
      .catch((error) => {
        console.error(error);
      });*/

    setMapURL(`https://maps.google.com/maps?q=${ville}&t=&z=13&ie=UTF8&iwloc=&output=embed`);

    recupLocalisation(plante);
  };

  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [city, setCity] = useState("");

  const mapClose = () => setActive(false);
  const mapShow = () => setActive(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredPlantes = plantes.filter(


    (plante) =>
      plante.nom_plante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  if (!isVisible) {
    return (
      <> <div className="animated-div">
        <div className="SearchBarDiv">
          <p className="texteStatut">Statut : Propriétaire</p>
          <form class="SearchBar form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Rechercher"
            aria-label="Rechercher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Rechercher
            </button>
          </form>
        </div>
        <div>
          <button className="buttonAdd" onClick={handleClick}>
            Ajouter sa plante
          </button>
        </div>
        <div>
        <div className="PlanteBrique">
  {filteredPlantes.map((plante) => (
    <div className="PlanteBriqueInside card" style={{ width: "18rem" }}>
      <img src={plante.photo_url ? `data:image/jpeg;base64,${plante.photo_url}` : require("../assets/img/plante.jpg")}
     className="card-img-top" style={{maxHeight: "200px",maxWidth: "300px"}}
     alt="..."
/>
      <div className="card-body">
        <h5 className="card-title">{plante.nom_plante}</h5>
          <button className="positionLocalisation" data-toggle="modal" onClick={() => {handleGetLocation(ville, plante);}}>
            <img
              src={require("../assets/img/localisation.png")}
              className="imgLocalisation"
            />
            {plante.localisation}
          </button>
        <p className="card-text">Description : {plante.description_plante}</p>
        <button
          className="buttonEnSavoirPlus btn btn-primary"
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
  ))}
</div>
          {/* Affiche un pop up avec les informations sur la plante */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{PlanteNameSelected}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={require("../assets/img/plante.jpg")}
                class="card-img-top"
              ></img>
              Proprietaire : {PlanteProprietaire}
              <br />
              Description : {PlanteDescriptionSelected}
              <br />
              Localisation : {PlanteLocalisationSelected}
              <br />
              Conseil : {PlanteConseilSelected}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Appliquer les modifications
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
              <div className="map-container" onChange={(event) => setMapURL(event.target.value)}>
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
        <div></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="SearchBarDiv">
          <p className="texteStatut">Statut : Propriétaire</p>
          <form class="SearchBar form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Rechercher"
              aria-label="Rechercher"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Rechercher
            </button>
          </form>
        </div>{" "}
        <div>
          <button className="buttonAdd" onClick={handleClick}>
            Revenir à la liste des plantes
          </button>
        </div>
        {isVisible && (
          <div className="animated-div">
           <AjoutPlante setShowAccueil={setShowAccueil} setShowProfil={setShowProfil} setShowVosPlantes={setShowVosPlantes}></AjoutPlante>
          </div>
        )}
      </>
    );
  }
};

export default Accueil;

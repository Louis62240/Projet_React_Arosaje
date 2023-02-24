import React, { useState , useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import AjoutPlante from "./AjoutPlante";
import "../assets/css/Accueil.css";
import {getPlantes,getPlanteById} from '../services/api'

const Home = () => {
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


    const recupDataPlante = (plante) => {
      // plante est un tableau contenant les informations de la plante
      const id = plante[0];
      getPlanteById(id)
        .then((data) => {
          // Mettre à jour les variables d'état avec les informations de la plante sélectionnée
          console.log(data);
          setPlanteNameSelected(data.nom_plante);
          setPlanteDescriptionSelected(data.localisation);
          setPlanteLocalisationSelected(data.description_plante);
          setPlanteConseilSelected(data.conseil);
          setPlanteProprietaire(data.nom_proprietaire);
          handleShow();
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

  const [show, setShow] = useState(false);
  const [city, setCity] = useState("");


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
      <img
              src={`data:image/jpeg;base64,${plante.photo}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{plante.nom_plante}</h5>
        <p className="positionLocalisation">
          <img
            src={require("../assets/img/localisation.png")}
            className="imgLocalisation"
          />
          {plante.localisation}
        </p>
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
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
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
           <AjoutPlante></AjoutPlante>
          </div>
        )}
      </>
    );
  }
};

export default Home;

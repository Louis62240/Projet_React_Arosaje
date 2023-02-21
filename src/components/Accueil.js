import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import AjoutPlante from "./AjoutPlante";
import "../assets/css/Accueil.css";
const Home = () => {
  const Plante = [
    {
      name: "Tulipe",
      description: "A arroser tous les 2 jours",
      Localisation: "Lille",
    },
    {
      name: "Cactus",
      description: "A arroser tous les 4 jours",
      Localisation: "Lille",
    },
    {
      name: "Tulipe",
      description: "A arroser tous les jours",
      Localisation: "Quesques",
    },
    {
      name: "Orchidée",
      description: "A arroser tous les jours",
      Localisation: "Lille",
    },
    {
      name: "Marguerite",
      description: "A arroser tous les 2 jours",
      Localisation: "Roubaix",
    },
  ];

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [localisation, setLocalisation] = useState("");

  const [PlanteNameSelected, setPlanteNameSelected] = useState("");
  const [PlanteDescriptionSelected, setPlanteDescriptionSelected] =
    useState("");
  const [PlanteLocalisationSelected, setPlanteLocalisationSelected] =
    useState("");

  const recupDataPlante = (plante) => {
    setPlanteNameSelected(plante.name);
    setPlanteDescriptionSelected(plante.description);
    setPlanteLocalisationSelected(plante.Localisation);
    handleShow();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            {Plante.map((plante) => (
              <div class="PlanteBriqueInside card" style={{ width: "18rem" }}>
                <img
                  src={require("../assets/img/plante.jpg")}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">{plante.name}</h5>
                  <p className="positionLocalisation">
                    <img
                      src={require("../assets/img/localisation.png")}
                      className="imgLocalisation"
                    />
                    {plante.Localisation}
                  </p>
                  <p class="card-text">{plante.description}</p>
                  <button
                    class="buttonEnSavoirPlus btn btn-primary"
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
              <br />
              Description : {PlanteDescriptionSelected}
              <br />
              Localisation : {PlanteLocalisationSelected}
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

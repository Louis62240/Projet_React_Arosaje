import React,{useState} from 'react';
import '../assets/css/VosPlantes.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    
    <>
      <div className='ComponentVosPlantes'>
        <p className="texteStatut">Vos plantes :</p>
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
    </>
  );
};

export default Home;
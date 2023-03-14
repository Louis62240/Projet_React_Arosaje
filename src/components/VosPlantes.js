import React,{useState,useEffect} from 'react';
import '../assets/css/VosPlantes.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {getPlantesByProprietaire} from '../services/api'

const Home = () => {

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

  const [Plantes, setPlantes] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    console.log('Utilisateur :')
    console.log(utilisateur)
    if (utilisateur) {
      getPlantesByProprietaire(utilisateur.utilisateur[0]).then(data => {
        setPlantes(data);
        console.log(data);
      });
    }
  }, []);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    
    <><div className="animated-div">
      <div className='ComponentVosPlantes'>
        <p className="texteStatut">Vos plantes :</p>
          <div className="PlanteBrique">
          {Plantes.map((plante) => (
    <div className="PlanteBriqueInside card" style={{ width: "18rem" }}>
      <img src={plante.photo_url ? `data:image/jpeg;base64,${plante.photo_url}` : require("../assets/img/plante.jpg")}
     className="ImagePlante card-img-top"
     alt="..."
/><button className="positionLocalisation" data-toggle="modal">
            <img
              src={require("../assets/img/localisation.png")}
              className="imgLocalisation"
            />
            {plante.localisation}
          </button>
      <div className="card-body">
        <h5 className="card-title">{plante.nom_plante}</h5>
        <div>
        <p className="description card-text">Description : {plante.description_plante}</p>
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
    </div>
    </>
  );
};

export default Home;
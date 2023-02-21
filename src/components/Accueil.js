import React from "react";
import "../assets/css/Accueil.css";
const Home = () => {
  const Plante = [{name:'Tulipe',description:'A arroser tous les 2 jours',Localisation:'Lille'},{name:'Cactus',description:'A arroser tous les 4 jours',Localisation:'Lille'},{name:'Tulipe',description:'A arroser tous les jours',Localisation:'Quesques'},{name:'Orchidée',description:'A arroser tous les jours',Localisation:'Lille'},{name:'Marguerite',description:'A arroser tous les 2 jours',Localisation:'Roubaix'}]
  const recupDataPlante = (plante) => {
    console.log(plante);
    
  }


  return (
    <>
    <div className='SearchBarDiv'>
      <p className='texteStatut'>Statut : Propriétaire</p>
      <form class="SearchBar form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Rechercher" aria-label="Rechercher"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Rechercher</button>
    </form>
    </div>
    <div>
      <button className='buttonAdd'>Ajouter sa plante</button>
    </div>
    <div>
<div className='PlanteBrique'>
    {Plante.map(plante =>     
    <div class="PlanteBriqueInside card" style={{width: '18rem'}}>
    <img src={require("../assets/img/plante.jpg")} class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">{plante.name}</h5>
      <p className='positionLocalisation'><img src={require("../assets/img/localisation.png")} className='imgLocalisation'/>{plante.Localisation}</p>
      <p class="card-text">{plante.description}</p>
      <a href="#" class="buttonEnSavoirPlus btn btn-primary"  onClick={() => {recupDataPlante(plante);}}>En savoir plus</a>
    </div>
  </div>

    )}
    </div>

</div>

    </>
  );
};

export default Home;

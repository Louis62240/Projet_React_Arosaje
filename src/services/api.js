import axios from 'axios';

const getPlantes = () => {
  return axios.get("http://127.0.0.1:8000/plantes", {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log(response.data); // affiche les données dans la console
    return response.data; // retourne les données sous forme d'objet JSON
  })
  .catch((error) => {
    console.log(error);
  });
};
const getPlanteById = (id) => {
  return axios.get(`http://127.0.0.1:8000/plante/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log(response.data); // affiche les données dans la console
    return response.data; // retourne les données sous forme d'objet JSON
  })
  .catch((error) => {
    console.log(error);
  });
};
const addPlante = (proprietaire_id, gardiens_id, nom_plante, description_plante, localisation) => {
  return axios.post("http://127.0.0.1:8000/plante", {
    proprietaire_id,
    gardiens_id,
    nom_plante,
    description_plante,
    localisation
  }, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log(response.data); // affiche les données dans la console
    return response.data; // retourne les données sous forme d'objet JSON
  })
  .catch((error) => {
    console.log(error);
  });
};

export { getPlantes ,getPlanteById,addPlante};
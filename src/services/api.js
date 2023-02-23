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
const addPlante = async (proprietaireId, nomPlante, descriptionPlante, localisation, gardiensId) => {
  const data = {
    proprietaire_id: proprietaireId,
    nom_plante: nomPlante,
    description_plante: descriptionPlante,
    localisation: localisation,
    gardiens_id: gardiensId || null,
  };
  try {
    const response = await axios.post("http://127.0.0.1:8000/plante", data, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data); // affiche les données dans la console
    return response.data; // retourne les données sous forme d'objet JSON
  } catch (error) {
    console.log(error);
  }
};
const CHECK_LOGIN_URL = 'http://127.0.0.1:8000/connexion';

/**
 * Vérifie les identifiants d'un utilisateur en faisant une requête à l'API.
 * @param {string} email - L'adresse email de l'utilisateur à vérifier.
 * @param {string} password - Le mot de passe de l'utilisateur à vérifier.
 * @returns {Promise<boolean>} - Une promesse qui résout en un booléen indiquant si les identifiants sont valides ou non.
 *  * @param {function} onConnect - La fonction qui doit être appelée lorsque l'utilisateur est connecté.

 */
export async function checkConnexion(email, password,onConnect) {
  try {
    console.log(`${CHECK_LOGIN_URL}?email=${email}&mot_de_passe=${password}`)
    // Faire une requête GET à l'API avec les identifiants fournis dans les paramètres d'URL
    const response = await axios.get(`${CHECK_LOGIN_URL}?email=${email}&mot_de_passe=${password}`);
    console.log(response.data)
    if(response.data.connexion===true)
    {
      console.log('yes')
      onConnect();
      return true;
    }
    else
    {
      return false;
    }
  } catch (error) {
    // En cas d'erreur, afficher un message dans la console et retourner false
    console.error(error);
    return false;
  }
}



export { getPlantes ,getPlanteById,addPlante};
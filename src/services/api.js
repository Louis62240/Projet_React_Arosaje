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
const addPlante = async (proprietaire_id, nom_plante, description_plante, localisation) => {
  const url = `http://127.0.0.1:8000/plante?proprietaire_id=${proprietaire_id}&nom_plante=${nom_plante}&description_plante=${description_plante}&localisation=${localisation}`;
  try {
    const response = await axios.post(url, {
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
export const addPhoto = async (photo, idPlante) => {
  try {
    // Convertir l'objet File en une chaîne de caractères en base64
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];
      console.log(base64Image);
      
      // Envoyer l'image en base64 à l'API
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_plantes: idPlante, photo_url: base64Image })
      };
      const response = await fetch('http://127.0.0.1:8000/photo/', requestOptions);
      const data = await response.json();
      return data;
    };
  } catch (error) {
    console.log(error);
  }
};

export const addConseil = async (idPlante, conseil) => {
  const url = `http://127.0.0.1:8000/conseil/${idPlante}?conseil=${conseil}`;
  try {
    const response = await axios.post(url, {}, {
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
const addUser = async (nom, mot_de_passe, telephone, email) => {
  const url = `http://127.0.0.1:8000/utilisateur?nom=${nom}&mot_de_passe=${mot_de_passe}&telephone=${telephone}&email=${email}`;
  try {
    const response = await axios.post(url, {
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





export { getPlantes ,getPlanteById,addPlante,addUser};
import axios from 'axios';
import bcrypt from 'bcryptjs';
export const getPlantes = () => {
  return axios.get("http://127.0.0.1:8000/plantes/sansGardien", {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return response.data; // retourne les données sous forme d'objet JSON
  })
  .catch((error) => {
    console.log(error);
  });
};

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
export const getPlanteById = (id) => {
  return axios.get(`http://127.0.0.1:8000/plante/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return response.data; // retourne les données sous forme d'objet JSON
  })
  .catch((error) => {
    console.log(error);
  });
};
export const addPlante = async (proprietaire_id, nom_plante, description_plante, localisation) => {
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
const PASSWORD_LOGIN_URL = 'http://127.0.0.1:8000/connexiontest';

/**
 * Vérifie les identifiants d'un utilisateur en faisant une requête à l'API.
 * @param {string} email - L'adresse email de l'utilisateur à vérifier.
 * @param {string} password - Le mot de passe de l'utilisateur à vérifier.
 * @returns {Promise<boolean>} - Une promesse qui résout en un booléen indiquant si les identifiants sont valides ou non.
 *  * @param {function} onConnect - La fonction qui doit être appelée lorsque l'utilisateur est connecté.

 */


export async function checkConnexion(email, password,onConnect) {
 try
 {
  CheckConnexionPassword(email,password);
  onConnect();
  return true;
 }
  catch(error)
  {
    console.log(error);
  }
}

export async function CheckConnexionPassword(email,password) {
  try {
    // Faire une requête GET à l'API avec l'email fourni dans les paramètres d'URL
    const response = await axios.get(`${PASSWORD_LOGIN_URL}?email=${email}`);
    const passwordHash = response.data.mot_de_passe;
    const passwordIsValid = await checkPassword(password, passwordHash);
    const utilisateur =await getUserId(response.data.id_utilisateur);
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
    localStorage.setItem('token', response.data.token);
    return passwordIsValid;
  } catch (error) {
    // En cas d'erreur, afficher un message dans la console et retourner false
    console.error(error);
    return false;
  }
}
export const addUser = async (nom, mot_de_passe, telephone, email) => {
  const hashedPassword = await hashPassword(mot_de_passe);
  const url = `http://127.0.0.1:8000/utilisateur?nom=${nom}&mot_de_passe=${hashedPassword}&telephone=${telephone}&email=${email}`;
  try {
    const response = await axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    return response.data; // retourne les données sous forme d'objet JSON
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id_utilisateur, nom, mot_de_passe, telephone, email) => {
  const hashedPassword = await hashPassword(mot_de_passe);
  const url = `http://127.0.0.1:8000/utilisateur/${id_utilisateur}?nom=${nom}&mot_de_passe=${hashedPassword}&telephone=${telephone}&email=${email}`;
  try {
    const response = await axios.put(url, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    return response.data; // retourne les données sous forme d'objet JSON
  } catch (error) {
    console.log(error);
  }
};


export const getUserId = async (id_utilisateur) => {
  const url = `http://127.0.0.1:8000/utilisateur/id/${id_utilisateur}`;
  try {
    const response = await axios.get(url);
    return response.data; // retourne l'id de l'utilisateur
  } catch (error) {
    console.log(error);
  }
};

export const updatePlanteGardien = async (idPlante, gardiensId) => {
  const url = `http://127.0.0.1:8000/plante/gardien/${idPlante}?gardiens_id=${gardiensId}`;
  try {
    const response = await axios.put(url, {}, {
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
export const getPlantesByProprietaire = async (proprietaireId) => {
  const url = `http://127.0.0.1:8000/plantes/proprietaire/${proprietaireId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data); // affiche les données dans la console
    return response.data; // retourne les données sous forme d'array
  } catch (error) {
    console.log(error);
  }
};
export const getPlantesByVille = async (ville) => {
  const url = `http://127.0.0.1:8000/plantes/ville/${ville}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data); // affiche les données dans la console
    return response.data; // retourne les données sous forme d'array
  } catch (error) {
    console.log(error);
  }
};
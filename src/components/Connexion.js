import { useState } from 'react';
import { checkConnexion , addUser} from '../services/api';
import '../assets/css/Connexion.css';

function Connexion({ onConnect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true); // state pour savoir quel formulaire afficher

  const [nom, setNom] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [emailInscription, setEmailInscription] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailInscriptionChange = (event) => setEmailInscription(event.target.value);
  const handleMotDePasseInscriptionChange = (event) => setMotDePasse(event.target.value);
  const handleNomInscriptionChange = (event) => setNom(event.target.value);
  const handleTelephoneInscriptionChange = (event) => setTelephone(event.target.value);
  

  // addUser('Louis', 'bebou', '0751663896', 'l.hanquiez22@gmail.com')
  // .then(data => console.log(data))
  // .catch(error => console.log(error));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isLoginValid = await checkConnexion(email, password, onConnect);

    if (isLoginValid) {

    } else {
      setErrorMessage('Adresse email ou mot de passe incorrect.'); // Afficher un message d'erreur
    }
  };

  const handleSubmitInscription = async (event) => {
    event.preventDefault();
    try {
      // Vérifier que tous les champs requis sont remplis
      if (!nom || !emailInscription || !motDePasse || !telephone) {
        throw new Error('Veuillez remplir tous les champs requis');
      }
  
      // Vérifier que l'adresse email est valide
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInscription)) {
        throw new Error('Adresse email invalide');
      }
  
      // Vérifier que le mot de passe a une longueur minimale
      if (motDePasse.length < 8) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères');
      }
  
      // Vérifier que le numéro de téléphone est valide
      const phoneRegex = /^0[1-9]\d{8}$/;
      if (!phoneRegex.test(telephone)) {
        throw new Error('Numéro de téléphone invalide');
      }
  
      const result = await addUser(nom, motDePasse, telephone, emailInscription);
      alert('Inscription réussie !');
      // Ajouter ici le code pour rediriger vers une autre page ou afficher un message de confirmation
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm); // Inverser l'état du formulaire affiché
  };

  return (
    <>
    <img
          src={require("../assets/img/logo.png")}
          alt="Logo"
          className="logo"
          height={100}
        />
    <div className='PlacementCard'>
      <div className="cardConnexion">
        
        {isLoginForm ? (
          <>
          <p className='texteRaviRevoir'>Ravi de vous revoir !</p>
          <form className='formConnexion animated-div' onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="email">Adresse email :</label><br/>
              <input className='InputConnexion' type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="password">Mot de passe :</label><br/>
              <input className='InputConnexion' type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <br/>
            <button className="btnConnexion" type="submit">Se connecter</button><br/>
            <a className='buttonSecondaire' onClick={handleSwitchForm}>Vous ne possèdez pas de Compte ? Cliquez ici</a>
          </form></>
        ) : (
          <div className="animated-div">
          <form className='formInscription animated-div' onSubmit={handleSubmitInscription}>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="nom">Nom :</label><br/>
              <input className='InputConnexion' type="text" id="nom" name="nom" value={nom}
          onChange={handleNomInscriptionChange} />
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="email">Adresse email :</label><br/>
              <input className='InputConnexion' type="email" id="email" name="email"  value={emailInscription}
          onChange={handleEmailInscriptionChange}/>
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="password">Mot de passe :</label><br/>
              <input className='InputConnexion' type="password" id="password" name="password" value={motDePasse}
          onChange={handleMotDePasseInscriptionChange}/>
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="telephone">Telephone :</label><br/>
              <input className='InputConnexion' type="text" id="telephone" name="telephone"   value={telephone}
          onChange={handleTelephoneInscriptionChange}/>
            </div>
            <br/>
            <button className="btnConnexion" type="submit">S'inscrire</button><br/>
            {error && <div className="error">{error}</div>}
            <a className='buttonSecondaire' onClick={handleSwitchForm}>Vous avez déja un compte ? Cliquez ici</a>
          </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Connexion;

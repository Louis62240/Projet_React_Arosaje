import { useState } from 'react';
import { checkConnexion } from '../services/api';
import '../assets/css/Connexion.css';

function Connexion({ onConnect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true); // state pour savoir quel formulaire afficher

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isLoginValid = await checkConnexion(email, password, onConnect);

    if (isLoginValid) {
      console.log('yesss'); // Connexion réussie, rediriger vers la page d'accueil
    } else {
      setErrorMessage('Adresse email ou mot de passe incorrect.'); // Afficher un message d'erreur
    }
  };

  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm); // Inverser l'état du formulaire affiché
  };

  return (
    <div className='PlacementCard'>
      <div className="card">
        <img
          src={require("../assets/img/logo.png")}
          alt="Logo"
          className="logo"
          height={100}
        />
        {isLoginForm ? (
          <form className='formConnexion' onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="email">Adresse email :</label>
              <input className='InputConnexion' type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="password">Mot de passe :</label>
              <input className='InputConnexion' type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <br/>
            <button className="btn" type="submit">Se connecter</button><br/>
            <a className='buttonSecondaire' onClick={handleSwitchForm}>Vous ne possèdez pas de Compte ? Cliquez ici</a>
          </form>
        ) : (
          <form className='formInscription'>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="email">Adresse email :</label>
              <input className='InputConnexion' type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="password">Mot de passe :</label>
              <input className='InputConnexion' type="password" id="password" name="password" />
            </div>
            <div className="form-group">
              <label className='labelConnexion' htmlFor="confirmPassword">Confirmer le mot de passe :</label>
              <input className='InputConnexion' type="password" id="confirmPassword" name="confirmPassword" />
            </div>
            <br/>
            <button className="btn" type="submit">S'inscrire</button><br/>
            <a className='buttonSecondaire' onClick={handleSwitchForm}>Vous avez déja un compte ? Cliquez ici</a>
          </form>
        )}
      </div>
    </div>
  );
}

export default Connexion;

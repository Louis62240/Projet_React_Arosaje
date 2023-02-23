import { useState } from 'react';
import { checkConnexion } from '../services/api';
import '../assets/css/Connexion.css';

function Connexion({ onConnect }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className='PlacementCard'>
    <div className="card">
    <img
            src={require("../assets/img/logo.png")}
            alt="Logo"
            className="logo"
            height={100}
          />
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
        <button className="btn" type="submit">Se connecter</button>
        
      </form>
    </div>
    </div>
  );
}

export default Connexion;

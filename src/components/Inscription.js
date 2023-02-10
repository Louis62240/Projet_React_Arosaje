import React, { useState } from "react";

const Inscription = () => {
  const [firstname, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", firstname);
    console.log("Surname:", surname);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Phone:", phone);
    console.log("Mail:", mail);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstname">Prenom :</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="surname">Nom :</label>
        <input
          type="text"
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Nom d'utilisateur:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mail">Mail :</label>
        <input
          type="text"
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Téléphone :</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit">Valider</button>
    </form>
  );
};

export default Inscription;
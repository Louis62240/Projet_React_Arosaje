import React, { useState } from "react";
import { addPlante } from "../services/api";

const AjoutPlante = () => {
  const [proprietaireId, setProprietaireId] = useState("");
  const [nomPlante, setNomPlante] = useState("");
  const [descriptionPlante, setDescriptionPlante] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [gardiensId, setGardiensId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addPlante(
        proprietaireId,
        nomPlante,
        descriptionPlante,
        localisation,
        gardiensId || null
      );
      console.log(response); // affiche les données dans la console
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="proprietaireId">Propriétaire ID:</label>
        <input
          type="text"
          id="proprietaireId"
          value={proprietaireId}
          onChange={(event) => setProprietaireId(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nomPlante">Nom de la plante:</label>
        <input
          type="text"
          id="nomPlante"
          value={nomPlante}
          onChange={(event) => setNomPlante(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="descriptionPlante">Description de la plante:</label>
        <input
          type="text"
          id="descriptionPlante"
          value={descriptionPlante}
          onChange={(event) => setDescriptionPlante(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="localisation">Localisation:</label>
        <input
          type="text"
          id="localisation"
          value={localisation}
          onChange={(event) => setLocalisation(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="gardiensId">Gardiens ID:</label>
        <input
          type="text"
          id="gardiensId"
          value={gardiensId}
          onChange={(event) => setGardiensId(event.target.value)}
        />
      </div>
      <button type="submit">Ajouter la plante</button>
    </form>
  );
};

export default AjoutPlante;

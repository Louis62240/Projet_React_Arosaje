import React from 'react';
import "../assets/css/AjouterPlante.css";

const AjoutPlante = () => {


  return (
   <>
   <form className='formulaireAjoutPlante'>
  <div class="form-group">
    <label for="exampleFormControlFile1">Photo de la plante</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
  </div>

    <div class="form-group">
    <label for="exampleInputEmail1">Type de plante</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Entrer le type de plante"/>
  </div>
  
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationServer03">Ville</label>
      <input type="text" class="form-control is-invalid" id="validationServer03" placeholder="City" required/>
      <div class="invalid-feedback">
        Veuillez entrer une ville valide.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationServer04">Département</label>
      <input type="text" class="form-control is-invalid" id="validationServer04" placeholder="State" required/>
      <div class="invalid-feedback">
      Veuillez entrer un département valide.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationServer05">Code postal</label>
      <input type="text" class="form-control is-invalid" id="validationServer05" placeholder="Zip" required/>
      <div class="invalid-feedback">
      Veuillez entrer un code postal valide.
      </div>
    </div>
  </div>
  </form>
   </>
  );
};

export default AjoutPlante;
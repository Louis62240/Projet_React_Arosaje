```pip install virtualenv

virtualenv venv

cd .\venv\Scripts\

.\activate.ps1  

cd ../..

pip install sqlite3worker, pydantic, fastapi, "uvicorn[standart]"

uvicorn main:app --reload --port 8000
```

```
Liste des routes

#ajoute une plante
@app.post("/plante")
POST http://127.0.0.1:8000/plante?proprietaire_id=1&nom_plante=Cacuts&description_plante=Cactus du desert&localisation=Lille

# ajouter un conseil à une plante
@app.post('/conseil/{id_plante}')
POST http://127.0.0.1:8000/conseil/1?conseil=arroser

# ajouter une photo à une plante
@app.post('/photo/{id_plante}')
POST http://127.0.0.1:8000/photo/1?photo_url=ceci_est_un_url.jpg

#ajoute un utilisateur
@app.post("/utilisateur")
GET http://127.0.0.1:8000/utilisateur?nom=Mon_nom&mot_de_passe=Mon_mot_de_passe&telephone=0123456789&email=mon.email@email.com

# route pour la connexion
@app.get("/connexion")
GET http://127.0.0.1:8000/connexion?email=email@email.com&mot_de_passe=pierrick

# route test pour la connexion
@app.get("/connexiontest")
GET http://127.0.0.1:8000/connexion?email=email@email.com&mot_de_passe=pierrick

#liste toutes les plantes
@app.get("/plantes")
GET http://127.0.0.1:8000/plantes

#liste de toutes les plantes pas gardées
@app.get("/plantes/sansGardien")
GET http://127.0.0.1:8000/plantes/sansGardien

#liste toutes les infos de la plante par son id
@app.get("/plante/{id_plante}")
http://127.0.0.1:8000/plante/1

#liste touts les utilisateurs
@app.get("/utilisateurs")
GET http://127.0.0.1:8000/utilisateurs

#donne l'id de l'utilisateur selon son nom
@app.get("/utilisateur/nom/{nom}")
GET http://127.0.0.1:8000/utilisateur/nom/pierrick

#donne tout de l'utilisateur selon son id
@app.get("/utilisateur/id/{id_utilisateur}")
GET http://127.0.0.1:8000/utilisateur/id/1

#Met à jour le gardien de la plante
@app.put("/plante/{id_plante}/gardien")
PUT http://127.0.0.1:8000/plante/gardien/1?gardiens_id=2

#supprime une plante et ce qui lui est assoscié
@app.delete("/plante/{id_plante}")
DELETE http://127.0.0.1:8000/plante/5

#supprime un utilisateur et ce qui lui est assoscié
@app.delete("/utilisateur/{id_utilisateur}")
DELETE http://127.0.0.1:8000/utilisateur/10

```
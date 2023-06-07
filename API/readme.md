```pip install virtualenv

virtualenv venv

cd .\venv\Scripts\

.\activate.ps1  

cd ../..

pip install -r .\requirements.txt

uvicorn main:app --reload --port 8000
```
```
pytest

pour lancer les tests
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
@app.post('/photo/')
POST http://127.0.0.1:8000/photo/           Body raw JSON 
{
  "id_plantes": 1,
  "photo_url": "ceci_est_une_photo"
}

#ajoute un utilisateur
@app.post("/utilisateur")
POST http://127.0.0.1:8000/utilisateur?nom=Mon_nom&mot_de_passe=Mon_mot_de_passe&telephone=0123456789&email=mon.email@email.com

# route pour la connexion
@app.get("/connexion")
GET http://127.0.0.1:8000/connexion?email=mon.email@email.com&mot_de_passe=Mon_mot_de_passe

# route test pour la connexion
@app.get("/connexiontest")
GET http://127.0.0.1:8000/connexiontest?email=mon.email@email.com&mot_de_passe=Mon_mot_de_passe

#liste toutes les plantes
@app.get("/plantes")
GET http://127.0.0.1:8000/plantes

#liste de toutes les plantes pas gardées
@app.get("/plantes/sansGardien")
GET http://127.0.0.1:8000/plantes/sansGardien

#liste toutes les infos de la plante par son id
@app.get("/plante/{id_plante}")
GET http://127.0.0.1:8000/plante/1

#liste touts les utilisateurs
@app.get("/utilisateurs")
GET http://127.0.0.1:8000/utilisateurs

#donne l'id de l'utilisateur selon son nom
@app.get("/utilisateur/nom/{nom}")
GET http://127.0.0.1:8000/utilisateur/nom/Mon_nom

#donne tout de l'utilisateur selon son id
@app.get("/utilisateur/id/{id_utilisateur}")
GET http://127.0.0.1:8000/utilisateur/id/1

#Met à jour le gardien de la plante
@app.put("/plante/{id_plante}/gardien")
PUT http://127.0.0.1:8000/plante/gardien/1?gardiens_id=2

#supprime une plante et ce qui lui est assoscié
@app.delete("/plante/{id_plante}")
DELETE http://127.0.0.1:8000/plante/2

#supprime un utilisateur et ce qui lui est assoscié
@app.delete("/utilisateur/{id_utilisateur}")
DELETE http://127.0.0.1:8000/utilisateur/2

#modifier un utilisateur selon son id
@app.put("/utilisateur/{id_utilisateur}")
PUT http://127.0.0.1:8000/utilisateur/1?nom=nouveau_nom&mot_de_passe=motdepassesecurise&telephone=1234565555&email=email@@@@@@@email.com

#renvoie tous les id des plantes qui ont pour proprietaire_id, l'id de l'utilisateur
@app.get("/plantes/proprietaire/{proprietaire_id}")
GET http://127.0.0.1:8000/plantes/proprietaire/1

#créé une conversation entre 2 utilisateurs
@app.post("/conversation/{id_utilisateur_1}/{id_utilisateur_2}")
POST http://127.0.0.1:8000/conversation/1/2

#ajoute un message dans la bdd en vérifiant que la conv existe, et qu'elle appartient bien aux 2 utiilisateurs renseignés
@app.post("/message")
POST http://127.0.0.1:8000/message?id_conversation=1&id_envoyeur=1&id_utilisateur_1=1&id_utilisateur_2=2
```


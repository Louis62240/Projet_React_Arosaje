from typing import Union
import sqlite3 as sq
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3worker
from fastapi.middleware.cors import CORSMiddleware


conn = sq.connect("arosa_je.db")
c = conn.cursor()


if conn:
    print("---------------------------------")
    print("Connexion établie")
    print("---------------------------------")
else:
    print("---------------------------------")
    print("Connexion échouée")
    print("---------------------------------")

app = FastAPI()
origins = [
    "http://localhost/",
    "http://localhost:3000/",
    "http://localhost:3001/",
    "http://localhost:8000/",
    "http://127.0.0.1/",
    "http://127.0.0.1:3000/",
    "http://127.0.0.1:3001/",
    "http://127.0.0.1:8000/",
    "http://localhost:3000",] 

app.add_middleware(CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

#ajoute une plante
@app.post("/plante")
async def add_article(proprietaire_id: int, nom_plante: str, description_plante: str, localisation: str, *, gardiens_id: int = None):
    c.execute("INSERT INTO plantes (proprietaire_id, nom_plante, description_plante, localisation, gardiens_id) VALUES (?, ?, ?, ?, ?)", (proprietaire_id, nom_plante, description_plante, localisation, gardiens_id))
    conn.commit()
    return {"status": "success", "id": c.lastrowid}

# ajouter un conseil à une plante
@app.post('/conseil/{id_plante}')
async def add_conseil( conseil: str, id_plante : int):
    
    # Ajout du conseil dans la table conseil_plante
    c.execute("INSERT INTO conseil_plante (id_plantes, conseil) VALUES (?, ?)", (id_plante, conseil))
    conn.commit()
    return f"Le conseil a été ajouté à la plante avec l'id {id_plante}."

# ajouter une photo à une plante
@app.post('/photo/{id_plante}')
async def add_photo( photo_url: str, id_plante : int):
    
    # Ajout de la photo dans la table plante_photos
    c.execute("INSERT INTO plante_photos (id_plantes, photo_url) VALUES (?, ?)", (id_plante, photo_url))
    conn.commit()
    return f"La photo a été ajouté à la plante avec l'id {id_plante}."

#ajoute un utilisateur
@app.post("/utilisateur")
async def add_article(nom : str, mot_de_passe : str, telephone: int, email: str):
    try:
        c.execute("INSERT INTO utilisateurs (nom, mot_de_passe, telephone, email) VALUES (?, ?, ?, ?)", (nom, mot_de_passe, telephone, email))
        conn.commit()
        return {"status": "success", "id": c.lastrowid}
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=409, detail="Utilisateur existe déjà")

#liste toutes les plantes
@app.get("/plantes")
async def get_articles():
    c.execute("SELECT * FROM plantes;")
    articles = c.fetchall()
    return articles

@app.get("/plante/{id_plante}")
async def get_plante_info(id_plante: int):
    # Récupération de l'information sur la plante
    c.execute("SELECT proprietaire_id, gardiens_id, nom_plante, description_plante, localisation FROM plantes WHERE id_plantes = ?", (id_plante,))
    result = c.fetchone()
    if result is None:
        raise HTTPException(status_code=404, detail="La plante n'a pas été trouvée.")
    proprietaire_id, gardiens_id, nom_plante, description_plante, localisation = result
    
    # Récupération du nom du propriétaire
    c.execute("SELECT nom FROM utilisateurs WHERE id_utilisateurs = ?", (proprietaire_id,))
    result = c.fetchone()
    if result is None:
        raise HTTPException(status_code=404, detail="Le propriétaire n'a pas été trouvé.")
    nom_proprietaire = result[0]
    
    # Récupération du nom du gardien
    c.execute("SELECT nom FROM utilisateurs WHERE id_utilisateurs = ?", (gardiens_id,))
    result = c.fetchone()
    if result is None:
        raise HTTPException(status_code=404, detail="Le gardien n'a pas été trouvé.")
    nom_gardien = result[0]
    
    # Récupération de l'URL de la photo de la plante
    c.execute("SELECT photo_url FROM plante_photos WHERE id_plantes = ?", (id_plante,))
    result = c.fetchone()
    if result is None:
        raise HTTPException(status_code=404, detail="La photo n'a pas été trouvée.")
    photo_url = result[0]
    
    # Récupération du conseil associé à la plante
    c.execute("SELECT conseil FROM conseil_plante WHERE id_plantes = ?", (id_plante,))
    result = c.fetchone()
    if result is None:
        raise HTTPException(status_code=404, detail="Le conseil n'a pas été trouvé.")
    conseil = result[0]
    
    return {
        "nom_proprietaire": nom_proprietaire,
        "nom_gardien": nom_gardien,
        "nom_plante": nom_plante,
        "description_plante": description_plante,
        "localisation": localisation,
        "photo_url": photo_url,
        "conseil": conseil
    }

#liste touts les utilisateurs
@app.get("/utilisateurs")
async def get_utilisateurs():
    c.execute("SELECT * FROM utilisateurs;")
    utilisateurs = c.fetchall()
    return utilisateurs

#donne l'id de l'utilisateur selon son nom
@app.get("/utilisateur/{nom}")
async def get_id_utilisateur_by_nom(nom: str):
    c.execute("SELECT id_utilisateurs FROM utilisateurs WHERE LOWER(nom) = LOWER(?)", (nom,))
    id_utilisateur = c.fetchone()
    if id_utilisateur is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return {"id_utilisateur": id_utilisateur[0]}

#Met à jour le gardien de la plante
@app.put("/plante/{id_plante}/gardien")
async def update_plante_gardien(id_plante: int, nom_gardien: str):
    try:
        # Récupérer l'ID du gardien
        c.execute("SELECT id_utilisateurs FROM utilisateurs WHERE nom=?", (nom_gardien,))
        gardien = c.fetchone()
        if gardien is None:
            raise HTTPException(status_code=404, detail="Gardien non trouvé")
        gardien_id = gardien[0]

        # Mettre à jour la plante avec l'ID du gardien
        c.execute("UPDATE plantes SET gardiens_id=? WHERE id_plantes=?", (gardien_id, id_plante))
        conn.commit()
        return {"status": "success"}
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=404, detail="Plante non trouvée")

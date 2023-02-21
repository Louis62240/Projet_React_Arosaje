from typing import Union
import sqlite3 as sq
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3worker

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

#ajoute une plante
@app.post("/plante")
async def add_article(proprietaire_id : int, gardiens_id : int, description_plante: str, localisation: str):
    try:
        c.execute("INSERT INTO plantes (proprietaire_id, gardiens_id, description_plante, localisation) VALUES (?, ?, ?, ?)", (proprietaire_id, gardiens_id, description_plante, localisation))
        conn.commit()
        return {"status": "success", "id": c.lastrowid}
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=409, detail="Plante existe déjà")

#liste toutes les plantes
@app.get("/plantes")
async def get_articles():
    c.execute("SELECT * FROM plantes;")
    articles = c.fetchall()
    return articles

#renvoie une plante recherchée par son id
@app.get("/plante/{id_plantes}")
async def get_plante(id_plantes: int):
    c.execute("SELECT * FROM plantes WHERE id_plantes=?", (id_plantes,))
    plante = c.fetchone()
    return plante
    

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


#liste touts les utilisateurs
@app.get("/utilisateurs")
async def get_utilisateurs():
    c.execute("SELECT * FROM utilisateurs;")
    utilisateurs = c.fetchall()
    return utilisateurs

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

# Liste des origines autorisées
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
]

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


# route pour la connexion
@app.get("/connexion")
async def connexion(email: str, mot_de_passe: str):
    # Récupération de l'utilisateur correspondant à l'email donné
    c.execute("SELECT mot_de_passe FROM utilisateurs WHERE email=?", (email, ))
    result = c.fetchone()

    # Vérification du mot de passe
    if result is not None and (mot_de_passe == result[0]):
        return {"connexion": True}
    else:
        return {"connexion": False}

# route test pour la connexion
@app.get("/connexiontest")
async def connexion(email: str):
    # Récupération de l'utilisateur correspondant à l'email donné
    c.execute("SELECT email, mot_de_passe FROM utilisateurs WHERE email=?", (email,))
    result = c.fetchone()

    if result is not None :
        return {"email": result[0], "mot_de_passe": result[1]}
    else:
        return {"connexion": False, "message": "Identifiants incorrects"}


#liste toutes les plantes
@app.get("/plantes")
async def get_plantes():
    c.execute("""
        SELECT 
            plantes.*,
            plante_photos.photo_url,
            GROUP_CONCAT(conseil_plante.conseil, '; ') as conseils
        FROM 
            plantes
            LEFT JOIN plante_photos ON plantes.id_plantes = plante_photos.id_plantes
            LEFT JOIN conseil_plante ON plantes.id_plantes = conseil_plante.id_plantes
        GROUP BY plantes.id_plantes;
    """)
    plantes = c.fetchall()
    response = []
    for plante in plantes:
        plante_dict = {
            "id_plante": plante[0],
            "proprietaire_id": plante[1],
            "gardiens_id": plante[2],
            "nom_plante": plante[3],
            "description_plante": plante[4],
            "localisation": plante[5],
            "photo_url": plante[6],
            "conseils": plante[7]
        }
        response.append(plante_dict)
    return response


#liste de toutes les plantes pas gardées
@app.get("/plantes/sansGardien")
async def get_plantes():
    c.execute("""
        SELECT 
            plantes.*,
            plante_photos.photo_url,
            GROUP_CONCAT(conseil_plante.conseil, '; ') as conseils
        FROM 
            plantes
            LEFT JOIN plante_photos ON plantes.id_plantes = plante_photos.id_plantes
            LEFT JOIN conseil_plante ON plantes.id_plantes = conseil_plante.id_plantes
        WHERE plantes.gardiens_id IS NULL
        GROUP BY plantes.id_plantes;
    """)
    plantes = c.fetchall()
    response = []
    for plante in plantes:
        plante_dict = {
            "id_plante": plante[0],
            "proprietaire_id": plante[1],
            "gardiens_id": plante[2],
            "nom_plante": plante[3],
            "description_plante": plante[4],
            "localisation": plante[5],
            "photo_url": plante[6],
            "conseils": plante[7]
        }
        response.append(plante_dict)
    return response



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
@app.get("/utilisateur/nom/{nom}")
async def get_id_utilisateur_by_nom(nom: str):
    c.execute("SELECT id_utilisateurs FROM utilisateurs WHERE LOWER(nom) = LOWER(?)", (nom,))
    id_utilisateur = c.fetchone()
    if id_utilisateur is None:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return {"id_utilisateur": id_utilisateur[0]}

#donne tout de l'utilisateur selon son id
@app.get("/utilisateur/id/{id_utilisateur}")
async def get_utilisateur(id_utilisateur: int):
    # Récupération des informations de l'utilisateur
    c.execute("SELECT * FROM utilisateurs WHERE id_utilisateurs=?", (id_utilisateur, ))
    utilisateur = c.fetchone()

    if utilisateur is not None:
        # Récupération des plantes de l'utilisateur en tant que propriétaire
        c.execute("SELECT * FROM plantes WHERE proprietaire_id=?", (id_utilisateur, ))
        plantes_proprietaire = c.fetchall()

        # Récupération des plantes de l'utilisateur en tant que gardien
        c.execute("SELECT * FROM plantes WHERE gardiens_id=?", (id_utilisateur, ))
        plantes_gardien = c.fetchall()

        # Construction de la réponse
        reponse = {
            "utilisateur": utilisateur,
            "plantes_proprietaire": plantes_proprietaire,
            "plantes_gardien": plantes_gardien
        }

        return reponse
    else:
        return {"erreur": "Utilisateur non trouvé"}


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

#supprime une plante et ce qui lui est assoscié
@app.delete("/plante/{id_plante}")
async def delete_plante(id_plante: int):
    # Supprimer la plante de la table plantes
    c.execute("DELETE FROM plantes WHERE id_plantes = ?", (id_plante,))
    conn.commit()

    # Supprimer les conseils associés à la plante de la table conseil_plante
    c.execute("DELETE FROM conseil_plante WHERE id_plantes = ?", (id_plante,))
    conn.commit()

    # Supprimer les photos associées à la plante de la table plante_photos
    c.execute("DELETE FROM plante_photos WHERE id_plantes = ?", (id_plante,))
    conn.commit()

    return {"status": "success"}

#supprime un utilisateur et ce qui lui est assoscié
@app.delete("/utilisateur/{id_utilisateur}")
async def delete_utilisateur(id_utilisateur: int):
    # Suppression de l'utilisateur
    c.execute("DELETE FROM utilisateurs WHERE id_utilisateurs=?", (id_utilisateur,))
    # Suppression des plantes associées
    c.execute("DELETE FROM plantes WHERE proprietaire_id=?", (id_utilisateur,))
    conn.commit()
    return {"message": f"Utilisateur avec l'id {id_utilisateur} supprimé avec succès, ainsi que toutes ses plantes associées."}

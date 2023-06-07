from typing import Union
import sqlite3 as sq
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
import sqlite3worker
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from dataclasses import dataclass
import datetime

@dataclass
class Plante_photo :
    id_plantes: int
    photo_url : str

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


@app.get("/")
async def root():
    return {"message": "requête succès"}

#ajoute une plante
@app.post("/plante")
async def add_plante(proprietaire_id: int, nom_plante: str, description_plante: str, localisation: str, *, gardiens_id: int = None):
    c.execute("INSERT INTO plantes (proprietaire_id, nom_plante, description_plante, localisation, gardiens_id) VALUES (?, ?, ?, ?, ?)", (proprietaire_id, nom_plante, description_plante, localisation, gardiens_id))
    conn.commit()
    return {"status": "success", "id": c.lastrowid}

# ajouter un conseil à une plante
@app.post('/conseil/{id_plante}')
async def add_conseil( conseil: str, id_plante : int):
    
    # Ajout du conseil dans la table conseil_plante
    c.execute("INSERT INTO conseil_plante (id_plantes, conseil) VALUES (?, ?)", (id_plante, conseil))
    conn.commit()
    return "conseil a été ajouté à la plante"

# ajouter une photo à une plante
@app.post('/photo/')
async def add_photo(plante_photo : Plante_photo):
    print(plante_photo)
    # Ajout de la photo dans la table plante_photos
    c.execute("INSERT INTO plante_photos (id_plantes, photo_url) VALUES (?, ?)", (plante_photo.id_plantes, plante_photo.photo_url))
    conn.commit()
    return "La photo a été ajoutée à la plante"

#ajoute un utilisateur
@app.post("/utilisateur")
async def add_article(nom : str, mot_de_passe : str, telephone: int, email: str):
    c.execute("INSERT INTO utilisateurs (nom, mot_de_passe, telephone, email) VALUES (?, ?, ?, ?)", (nom, mot_de_passe, telephone, email))
    conn.commit()
    return {"status": "success", "id": c.lastrowid}

# route pour la connexion
@app.get("/connexion")
async def connexion(email: str, mot_de_passe: str):
    # Récupération de l'utilisateur correspondant à l'email donné
    c.execute("SELECT id_utilisateurs, mot_de_passe FROM utilisateurs WHERE email=?", (email, ))
    result = c.fetchone()

    # Vérification du mot de passe
    if result is not None and (mot_de_passe == result[1]):
        return {"connexion": True, "id_utilisateur": result[0]}
    else:
        return {"connexion": False}


# @app.get("/connexiontest")
# async def connexion(email: str):
#     # Récupération de l'utilisateur correspondant à l'email donné
#     c.execute("SELECT id_utilisateurs, email, mot_de_passe FROM utilisateurs WHERE email=?", (email,))
#     result = c.fetchone()

#     if result is not None :
#         return {"id_utilisateur": result[0], "email": result[1], "mot_de_passe": result[2], "connexion": True}
#     else:
#         return {"connexion": False, "message": "Identifiants incorrects"}


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

#liste toutes les infos de la plante par son id
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
    
    # Récupération du nom du gardien s'il y en a un
    nom_gardien = ""
    if gardiens_id is not None:
        c.execute("SELECT nom FROM utilisateurs WHERE id_utilisateurs = ?", (gardiens_id,))
        result = c.fetchone()
        if result is not None:
            nom_gardien = result[0]
    
    # Récupération de l'URL de la photo de la plante
    c.execute("SELECT photo_url FROM plante_photos WHERE id_plantes = ?", (id_plante,))
    result = c.fetchone()
    if result:
        photo_url = result[0]
    else:
        photo_url = ""

    # Récupération du conseil associé à la plante
    c.execute("SELECT conseil FROM conseil_plante WHERE id_plantes = ?", (id_plante,))
    result = c.fetchone()
    if result :
        conseil = result[0]
    else :
        conseil = ""
    
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
    c.execute("SELECT nom, telephone, email FROM utilisateurs;")
    utilisateurs = c.fetchall()
    return utilisateurs, status.HTTP_200_OK


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
@app.put("/plante/gardien/{id_plante}")
async def update_plante_gardien(id_plante: int, gardiens_id: Optional[str] = None):
    # Vérifier si la plante existe dans la base de données
    c.execute("SELECT * FROM plantes WHERE id_plantes=?", (id_plante,))
    plante = c.fetchone()
    if not plante:
        raise HTTPException(status_code=404, detail="La plante n'a pas été trouvée.")
    
    # Mettre à jour le gardien de la plante avec l'ID fourni
    c.execute("UPDATE plantes SET gardiens_id=? WHERE id_plantes=?", (gardiens_id, id_plante))
    conn.commit()
    return {"status": "success"}


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

#modifier un utilisateur selon son id
@app.put("/utilisateur/{id_utilisateur}")
async def update_utilisateur(id_utilisateur: int, nom: str = None, mot_de_passe: str = None, telephone: int = None, email: str = None):
    # Vérification que l'utilisateur existe
    c.execute("SELECT * FROM utilisateurs WHERE id_utilisateurs=?", (id_utilisateur,))
    result = c.fetchone()
    if result is None:
        return {"status": "error", "message": "L'utilisateur avec cet ID n'existe pas."}

    # Mise à jour des informations de l'utilisateur
    if nom is not None:
        c.execute("UPDATE utilisateurs SET nom=? WHERE id_utilisateurs=?", (nom, id_utilisateur))
    if mot_de_passe is not None:
        c.execute("UPDATE utilisateurs SET mot_de_passe=? WHERE id_utilisateurs=?", (mot_de_passe, id_utilisateur))
    if telephone is not None:
        c.execute("UPDATE utilisateurs SET telephone=? WHERE id_utilisateurs=?", (telephone, id_utilisateur))
    if email is not None:
        c.execute("UPDATE utilisateurs SET email=? WHERE id_utilisateurs=?", (email, id_utilisateur))

    conn.commit()
    return {"status": "success", "id_utilisateur": id_utilisateur}

#renvoie tous les id des plantes qui ont pour proprietaire_id, l'id de l'utilisateur
@app.get("/plantes/proprietaire/{proprietaire_id}")
async def get_plantes_by_proprietaire(proprietaire_id: int):
    c.execute("SELECT id_plantes FROM plantes WHERE proprietaire_id=?", (proprietaire_id,))
    result = c.fetchall()
    return {"plantes": result}



@app.post("/conversation/{id_utilisateur_1}/{id_utilisateur_2}")
async def add_conversation(id_utilisateur_1: int, id_utilisateur_2: int):
    # Vérifier si la conversation existe déjà
    c.execute("SELECT id_conversation FROM conversation WHERE id_utilisateur_1 = ? AND id_utilisateur2 = ?", (id_utilisateur_1, id_utilisateur_2))
    result = c.fetchone()
    if result:
        return {"status": "error", "message": "La conversation existe déjà."}

    # Insérer la nouvelle conversation dans la table conversation
    c.execute("INSERT INTO conversation (id_utilisateur_1, id_utilisateur2) VALUES (?, ?)", (id_utilisateur_1, id_utilisateur_2))
    conn.commit()

    return {"status": "success", "id": c.lastrowid}





@app.post("/message")
async def add_message(id_conversation: int, id_envoyeur: int, id_utilisateur_1: int, id_utilisateur_2: int):
    # Vérifier si la conversation existe déjà
    c.execute("SELECT id_conversation FROM conversation WHERE id_conversation = ? AND id_utilisateur_1 = ? AND id_utilisateur2 = ?", (id_conversation, id_utilisateur_1, id_utilisateur_2))
    result = c.fetchone()
    if not result:
        return {"status": "error", "message": "La conversation n'existe pas ou vous n'êtes pas les propriétaires de cette conversation."}

    # Vérifier si l'id envoyeur correspond à l'utilisateur 1 ou 2
    if id_envoyeur != id_utilisateur_1 and id_envoyeur != id_utilisateur_2:
        return {"status": "error", "message": "L'id envoyeur ne correspond à aucun des utilisateurs de la conversation."}

    # Récupérer la date et heure actuelle
    date_message = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Insérer le message dans la table message
    c.execute("INSERT INTO message (id_conversation, id_envoyeur, date_message) VALUES (?, ?, ?)",
    (id_conversation, id_envoyeur, date_message))
    conn.commit()

    return {"status": "success", "id": c.lastrowid}



import requests

def test_integration():
    # ajout d'un utilisateur
    response = requests.post("http://127.0.0.1:8000/utilisateur?nom=Mon_nom&mot_de_passe=Mon_mot_de_passe&telephone=0123456789&email=mon.email@email.com")
    assert response.status_code == 200

    # connexion d'un utilisateur
    response = requests.get("http://127.0.0.1:8000/connexion?email=mon.email@email.com&mot_de_passe=Mon_mot_de_passe")
    assert response.json() == {"connexion": True, "id_utilisateur": 1}

    # ajout d'une plante
    response = requests.post("http://127.0.0.1:8000/plante?proprietaire_id=1&nom_plante=Cacuts&description_plante=Cactus du desert&localisation=Lille")
    assert response.status_code == 200

    # ajout d'un conseil pour la plante
    response = requests.post("http://127.0.0.1:8000/conseil/1?conseil=arroser")
    assert response.status_code == 200

    # ajout d'une photo pour la plante
    data = {"id_plantes": 1, "photo_url": "ceci_est_une_photo"}
    response = requests.post("http://127.0.0.1:8000/photo/", json=data)
    assert response.status_code == 200


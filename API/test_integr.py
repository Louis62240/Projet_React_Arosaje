import requests

def test_integration():
    # ajout d'un utilisateur
    response = requests.post("http://127.0.0.1:8000/utilisateur?nom=Mon_nom&mot_de_passe=Mon_mot_de_passe&telephone=0123456789&email=mon.email@email.com")
    assert response.status_code == 200

    # connexion d'un utilisateur
    response = requests.get("http://127.0.0.1:8000/connexion?email=mon.email@email.com&mot_de_passe=Mon_mot_de_passe")
    assert response.status_code == 200

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

    response = requests.get("http://127.0.0.1:8000/plantes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

    response = requests.get("http://127.0.0.1:8000/plantes/sansGardien")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

    response = requests.get("http://127.0.0.1:8000/plante/21")
    assert response.status_code == 200

    response = requests.get("http://127.0.0.1:8000/utilisateurs")
    assert response.status_code == 200

    response = requests.get("http://127.0.0.1:8000/utilisateur/nom/Mon_nom")
    assert response.status_code == 200

    response = requests.get("http://127.0.0.1:8000/utilisateur/id/1")
    assert response.status_code == 200

    response = requests.put("http://127.0.0.1:8000/plante/gardien/21?gardiens_id=2")
    assert response.status_code == 200

    response = requests.delete("http://127.0.0.1:8000/plante/1")
    assert response.status_code == 200

    response = requests.delete("http://127.0.0.1:8000/utilisateur/1")
    assert response.status_code == 200

    response = requests.put("http://127.0.0.1:8000/utilisateur/1?nom=nouveau_nom&mot_de_passe=motdepassesecurise&telephone=1234565555&email=email@@@@@@@email.com")
    assert response.status_code == 200

    response = requests.get("http://127.0.0.1:8000/plantes/proprietaire/1")
    assert response.status_code == 200



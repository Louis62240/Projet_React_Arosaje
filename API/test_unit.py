import requests
from main import app


def test_read_main():
    response = requests.get("http://127.0.0.1:8000/")
    assert response.status_code == 200
    assert response.json() == {"message": "requête succès"}
    

def test_add_plante():
    response = requests.post("http://127.0.0.1:8000/plante?proprietaire_id=1&nom_plante=Cacuts&description_plante=Cactus du desert&localisation=Lille")
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert response.json()["id"] is not None

def test_add_conseil():
    response = requests.post("http://127.0.0.1:8000/conseil/1?conseil=arroser")
    assert response.status_code == 200
    assert "conseil a été ajouté à la plante" in response.text

def test_add_photo():
    data = {
        "id_plantes": 1,
        "photo_url": "ceci_est_une_photo"
    }
    response = requests.post("http://127.0.0.1:8000/photo/", json=data)
    assert response.status_code == 200
    assert "La photo a été ajoutée à la plante" in response.text

def test_add_utilisateur():
    response = requests.post("http://127.0.0.1:8000/utilisateur?nom=Mon_nom&mot_de_passe=Mon_mot_de_passe&telephone=0123456789&email=mon.email@email.com")
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert response.json()["id"] is not None

def test_connexion():
    response = requests.get("http://127.0.0.1:8000/connexion?email=mon.email@email.com&mot_de_passe=Mon_mot_de_passe")
    assert response.status_code == 200
    assert response.json()["connexion"] is True

def test_connexiontest():
    payload = {
        "email": "mon.email@email.com"
    }
    response = requests.get("http://127.0.0.1:8000/connexiontest?email=mon.email@email.com&mot_de_passe=Mon_mot_de_passe", json=payload)
    assert response.status_code == 200
    assert response.json()["email"] == "mon.email@email.com"
    assert response.json()["mot_de_passe"] == "Mon_mot_de_passe"

def test_get_plantes():
    response = requests.get("http://127.0.0.1:8000/plantes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_plantes_sans_gardien():
    response = requests.get("http://127.0.0.1:8000/plantes/sansGardien")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
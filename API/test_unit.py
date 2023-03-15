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

def test_connexion():
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

def test_get_plante_by_id():
    response = requests.get("http://127.0.0.1:8000/plante/21")
    assert response.status_code == 200

def test_get_all_users():
    response = requests.get("http://127.0.0.1:8000/utilisateurs")
    assert response.status_code == 200

def test_get_id_user_by_name():
    response = requests.get("http://127.0.0.1:8000/utilisateur/nom/Mon_nom")
    assert response.status_code == 200

def test_get_all_of_user_by_id():
    response = requests.get("http://127.0.0.1:8000/utilisateur/id/1")
    assert response.status_code == 200

def test_modifier_gardien():
    response = requests.put("http://127.0.0.1:8000/plante/gardien/21?gardiens_id=2")
    assert response.status_code == 200

def test_delete_plante_by_id():
    response = requests.delete("http://127.0.0.1:8000/plante/1")
    assert response.status_code == 200

def test_delete_user_by_id():
    response = requests.delete("http://127.0.0.1:8000/utilisateur/1")
    assert response.status_code == 200

def test_modifier_user_by_id():
    response = requests.put("http://127.0.0.1:8000/utilisateur/1?nom=nouveau_nom&mot_de_passe=motdepassesecurise&telephone=1234565555&email=email@@@@@@@email.com")
    assert response.status_code == 200

def test_get_plante_de_utilisateur_by_id():
    response = requests.get("http://127.0.0.1:8000/plantes/proprietaire/1")
    assert response.status_code == 200


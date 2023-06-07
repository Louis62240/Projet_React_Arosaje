CREATE TABLE utilisateurs (
id_utilisateurs INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(255),
mot_de_passe VARCHAR(255),
telephone INT(20),
email VARCHAR(50) NOT NULL
);

CREATE TABLE plantes (
id_plantes INT AUTO_INCREMENT PRIMARY KEY,
proprietaire_id INT,
gardiens_id INT,
nom_plante VARCHAR(255),
description_plante VARCHAR(2000),
localisation VARCHAR(255),
FOREIGN KEY (proprietaire_id) REFERENCES utilisateurs(id_utilisateurs),
FOREIGN KEY (gardiens_id) REFERENCES utilisateurs(id_utilisateurs)
);

CREATE TABLE plante_photos (
id_plante_photos INT AUTO_INCREMENT PRIMARY KEY,
id_plantes INT,
photo_url VARCHAR(8000),
FOREIGN KEY (id_plantes) REFERENCES plantes(id_plantes)
);

CREATE TABLE conseil_plante (
id_conseil_plante INT AUTO_INCREMENT PRIMARY KEY,
id_plantes INT,
conseil VARCHAR(2000),
FOREIGN KEY (id_plantes) REFERENCES plantes(id_plantes)
);


CREATE TABLE conversation(
id_conversation INT AUTO_INCREMENT PRIMARY KEY,
id_utilisateur_1 INT,
id_utilisateur2 INT,
FOREIGN KEY (id_utilisateur_1) REFERENCES utilisateurs(id_utilisateurs),
FOREIGN KEY (id_utilisateur2) REFERENCES utilisateurs(id_utilisateurs)
);

CREATE TABLE message(
id_message INT AUTO_INCREMENT PRIMARY KEY,
id_conversation INT,
id_envoyeur INT,
date_message DATE,
FOREIGN KEY (id_conversation) REFERENCES conversation(id_conversation)
);


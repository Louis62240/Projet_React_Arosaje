CREATE TABLE utilisateurs (
    id_utilisateurs INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(255),
    mot_de_passe VARCHAR(255),
    telephone INTEGER(20),
    email VARCHAR(50) NOT NULL
);

CREATE TABLE plantes (
    id_plantes INTEGER PRIMARY KEY AUTOINCREMENT,
    proprietaire_id INTEGER,
    gardiens_id INTEGER,
    nom_plante VARCHAR(255),
    description_plante VARCHAR(2000),
    localisation VARCHAR(255),
    FOREIGN KEY (proprietaire_id) REFERENCES utilisateurs(id_utilisateurs),
    FOREIGN KEY (gardiens_id) REFERENCES utilisateurs(id_utilisateurs)
);

CREATE TABLE plante_photos (
    id_plante_photos INTEGER PRIMARY KEY AUTOINCREMENT,
    id_plantes INTEGER,
    photo_url VARCHAR(8000),
    FOREIGN KEY (id_plantes) REFERENCES plantes(id_plantes)
);

CREATE TABLE conseil_plante (
    id_conseil_plante INTEGER PRIMARY KEY AUTOINCREMENT,
    id_plantes INTEGER,
    conseil VARCHAR(2000),
    FOREIGN KEY (id_plantes) REFERENCES plantes(id_plantes)
);

CREATE TABLE conversation (
    id_conversation INTEGER PRIMARY KEY AUTOINCREMENT,
    id_utilisateur_1 INTEGER,
    id_utilisateur2 INTEGER,
    FOREIGN KEY (id_utilisateur_1) REFERENCES utilisateurs(id_utilisateurs),
    FOREIGN KEY (id_utilisateur2) REFERENCES utilisateurs(id_utilisateurs)
);

CREATE TABLE message (
    id_message INTEGER PRIMARY KEY AUTOINCREMENT,
    id_conversation INTEGER,
    id_envoyeur INTEGER,
    date_message DATE,
    FOREIGN KEY (id_conversation) REFERENCES conversation(id_conversation)
);

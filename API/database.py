import sqlite3 as sq
conn = sq.connect("arosa_je.db")

c = conn.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS utilisateurs (
                id_utilisateurs INTEGER PRIMARY KEY AUTOINCREMENT,
                nom VARCHAR(255),
                mot_de_passe VARCHAR(255),
                telephone INT(20),
                email VARCHAR(50) NOT NULL
                )""")

c.execute("""CREATE TABLE IF NOT EXISTS plantes (
                id_plantes INTEGER PRIMARY KEY AUTOINCREMENT,
                proprietaire_id INT,
                gardiens_id INT,
                nom_plante VARCHAR(255),
                description_plante VARCHAR(255),
                localisation VARCHAR(255),
                FOREIGN KEY (proprietaire_id) REFERENCES utilisateurs(id_utilisateurs),
                FOREIGN KEY (gardiens_id) REFERENCES utilisateurs(id_utilisateurs)
                )""")

c.execute("""CREATE TABLE IF NOT EXISTS plante_photos (
                id_plante_photos INTEGER PRIMARY KEY AUTOINCREMENT,
                id_plantes INT,
                photo_url TEXT,
                FOREIGN KEY (id_plantes) REFERENCES plantes(id_plantes)
                )""")

c.execute("""CREATE TABLE IF NOT EXISTS conseil_plante (
                id_conseil_plante INTEGER PRIMARY KEY AUTOINCREMENT,
                id_plantes INT,
                conseil TEXT,
                FOREIGN KEY (id_plantes) REFERENCES plantes(id_plantes)
                )""")


conn.commit()
conn.close()

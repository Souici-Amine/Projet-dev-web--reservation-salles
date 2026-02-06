# Plateforme de réservation de salles

## Description du projet

Ce projet est une plateforme de réservation de salles réalisée dans un cadre pédagogique.  
Le backend est développé avec **Node.js** et **Express**, connecté à **MySQL** via **Sequelize** (ORM) et sécurisé par **JWT**.  
Le projet expose une **API REST** au format **JSON** (authentification, gestion des salles, réservations, avis, statistiques).  
Le frontend est une interface simple en **HTML/CSS/JavaScript** qui permet de tester rapidement les endpoints de l’API, en utilisant `fetch` avec `async/await` pour les appels HTTP.

Le projet est composé de deux parties :

- **BackEnd** : API REST (Node.js + Express + Sequelize + MySQL + JWT)
- **FrontEnd** : interface utilisateur en **HTML/CSS/JavaScript** (page de test des API)

---

## Prérequis

Avant d’exécuter le projet, il est nécessaire d’avoir installé sur la machine :

- **Node.js** (version 18 ou supérieure recommandée)
- **MySQL Server** (installation "Full") (version 8.0.45) (lien: "https://dev.mysql.com/downloads/installer/", -->2éme option, -->skip oracle login )
- **un IDE comme VScode**.

---

## Structure du projet

```
Projet/
│
├── BackEnd/
│   ├── app.js                      # Point d'entrée du serveur
│   ├── config/
│   │   └── database.js             # Configuration de la base de données
│   ├── controllers/
│   │   └── authCont.js             # Contrôleurs d'authentification
│   ├── middlewares/
│   │   └── authMiddleware.js       # Middleware d'authentification JWT
│   ├── models/                     # Modèles Sequelize
│   │   ├── index.js
│   │   ├── Utilisateur.js
│   │   ├── Salle.js
│   │   ├── Reservation.js
│   │   └── Avi.js
│   ├── routes/                     # Routes de l'API
│   │   ├── auth.js
│   │   ├── utilisateurs.js
│   │   ├── salles.js
│   │   ├── reservations.js
│   │   ├── avis.js
│   │   └── stats.js
│   ├── utils/
│   │   └── jwt.js                  # Utilitaires JWT
│   ├── .env                        # Variables d'environnement (à créer)
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   └── index.html                  # Interface de test des API
│
└── README.md
```

### Pourquoi cette structure ?

- **controllers/** : regroupe la logique métier et les actions sur les ressources (auth, salles, réservations, avis).
- **routes/** : déclare les endpoints et relie chaque route au contrôleur correspondant.
- **models/** : définit les modèles Sequelize et les relations entre les tables (source unique de vérité pour le schéma).
- **middlewares/** : centralise les traitements transverses (ex. vérification JWT).
- **config/** : isole la configuration de la base de données pour la rendre réutilisable et maintenable.
- **utils/** : contient les fonctions utilitaires partagées (ex. génération/validation de JWT).
- **BackEnd/** : contient l’API REST (logique serveur).
- **Frontend/** : contient l’interface de test des API (fichier statique).

---

## Étapes d’installation

### 1) Télécharger le projet

Téléchargez le ZIP depuis GitHub puis extrayez-le.

### 2) Ouvrir le projet

Ouvrez le dossier du projet dans VS Code.

## Installation du backend

### 1) Accéder au dossier backend

Dans VScode ouvrez un terminal et placez-vous dans le dossier backend :

cd BackEnd

### 2) Installer les dépendances

Installez les dépendances du backend :

npm install

Les dépendances (Express, Sequelize, MySQL, CORS, etc.) sont automatiquement installées via le fichier `package.json`.
Aucune installation manuelle n’est nécessaire.

---

## Configuration de la base de données MySQL

### 1) Lancer MySQL Server

Ouvrez MySQL Workbench, faites défiler(scroll) jusqu’à « Connexions MySQL », cliquez sur l’instance locale puis saisissez votre mot de passe (obtenu dans linstallation).

---

### 2) Créer la base de données

Dans MySQL, exécutez :

CREATE DATABASE reservation_salle_bdd;

USE reservation_salle_bdd;

### 3) Créer le fichier `.env`

Dans le dossier `BackEnd`, créez un fichier `.env` contenant :

DB_NAME=reservation_salle_bdd
DB_USER=root
DB_PASSWORD=mot_de_passe_mysql # votre mot de passe MySQL(obtenu dans linstallation).
DB_HOST=localhost
JWT_SECRET=your_super_secret_key_here_change_this_in_production
JWT_EXPIRES_IN=7d

> \*\*Le fichier `.env` n’est pas inclus dans le dépôt GitHub pour des raisons de sécurité.
> Il doit être créé localement.

---

## Lancer le serveur backend

Toujours dans le dossier `BackEnd`, exécutez :

node app.js

Si la configuration est correcte, le serveur démarre et l’API est accessible.

## Données de test (optionnel)

Pour remplir les tables avec des données de test :

1. Exécutez :
   node seed.js
2. Redémarrez le serveur :
   node app.js

Comptes de test :

- admin@example.com / Admin123!
- proprietaire@example.com / Prop123!
- client@example.com / Client123!

## Lancer l’interface

Ouvrez [Frontend/index.html](Frontend/index.html) dans votre navigateur.

Vous pouvez maintenant utiliser l’interface pour remplir la base et tester les fonctionnalités.

---

## Technologies utilisées

### Backend

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- JSON
- JWT (authentification)

### Frontend

- HTML
- CSS
- JavaScript

## Schema de base de donnees peut etre consulter depuis l'image ou pdf "Diagramme de schema de la bdd"

---

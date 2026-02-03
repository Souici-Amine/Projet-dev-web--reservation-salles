# Plateforme de réservation de salles

## Description du projet
Ce projet est une plateforme de réservation de salles réalisée dans un cadre pédagogique.  
Le backend est développé avec **Node.js**, **Express** et **MySQL**, en utilisant **Sequelize** comme ORM.  
Le projet expose une **API REST** utilisant le format **JSON**.

Le projet est composé de deux parties :
- **BackEnd** : API REST (Node.js + Express)
- **FrontEnd** : interface utilisateur

---

## Prérequis
Avant d’exécuter le projet, il est nécessaire d’avoir installé sur la machine :

- **Node.js** (version 18 ou supérieure recommandée)
- **MySQL Server** (version 8.0.45) (lien: "https://dev.mysql.com/downloads/installer/", -->2éme option, -->skip oracle login )
- Un terminal (CMD, PowerShell ou Terminal) ou un IDE comme VScode.

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

---
## Telecharger le zip depuis le lien github.

## Installation du Backend

### 1- Accéder au dossier backend

Ouvrir un terminal et se placer dans le dossier backend :


cd BackEnd




### 2- Installer les dépendances


npm install


Les dépendances (Express, Sequelize, MySQL, CORS, etc.) sont automatiquement installées
grâce au fichier `package.json`.  
Aucune installation manuelle des bibliothèques n’est nécessaire.

---

## Configuration de la base de données MySQL

### 1- Lancer MySQL Server

S’assurer que le serveur MySQL est en cours d’exécution.

---

### 2- Créer la base de données

Dans MySQL, exécuter la commande suivante :


CREATE DATABASE reservation_salle_bdd;




### 3- Créer le fichier `.env`

Dans le dossier `BackEnd`, créer un fichier nommé `.env` contenant :


DB_NAME=reservation_salle_bdd

DB_USER=root

DB_PASSWORD=mot_de_passe_mysql

DB_HOST=localhost

JWT_SECRET=your_super_secret_key_here_change_this_in_production

JWT_EXPIRES_IN=7d


> **Le fichier `.env` n’est pas inclus dans le dépôt GitHub pour des raisons de sécurité.  
> Il doit être créé localement.

---

## Lancer le serveur backend

Toujours dans le dossier `BackEnd`, exécuter :


node app.js


Si la configuration est correcte, le serveur démarre et l’API est accessible.

---

## Technologies utilisées

- Node.js
- Express
- MySQL
- Sequelize (ORM)
- JSON
- JWT (pour l’authentification)

---


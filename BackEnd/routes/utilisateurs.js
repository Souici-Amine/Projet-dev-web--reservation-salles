const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/utilisateur');

router.get('/', async (req, res) => {
    try {
        const users = await Utilisateur.findAll();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/', async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe, role } = req.body;
        const newUser = await Utilisateur.create({
            nom,
            prenom,
            email,
            mot_de_passe,
            role
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});














module.exports = router;
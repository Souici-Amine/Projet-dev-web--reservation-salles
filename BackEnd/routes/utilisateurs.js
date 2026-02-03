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














module.exports = router;
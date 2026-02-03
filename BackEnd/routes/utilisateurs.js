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

router.get('/:id', async (req, res) => {
    try {
        const user = await Utilisateur.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});













module.exports = router;
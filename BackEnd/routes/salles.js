const express = require('express');
const router = express.Router();
const { Salle } = require('../models');

// GET all salles
router.get('/', async (req, res) => {
    try {
        const salles = await Salle.findAll();
        res.json(salles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET salle by ID
router.get('/:id', async (req, res) => {
    try {
        const salle = await Salle.findByPk(req.params.id);
        if (!salle) {
            return res.status(404).json({ error: 'Salle non trouvée' });
        }
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new salle
router.post('/', async (req, res) => {
    try {
        const { nom, descrption, capacite, prix, adresse, proprietaireId } = req.body;

        // Validate required fields
        if (!nom || !capacite || !prix) {
            return res.status(400).json({ error: 'nom, capacite, et prix sont requis' });
        }

        const salle = await Salle.create({
            nom,
            descrption,
            capacite,
            prix,
            adresse,
            proprietaireId
        });
        res.status(201).json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE salle
router.put('/:id', async (req, res) => {
    try {
        const salle = await Salle.findByPk(req.params.id);
        if (!salle) {
            return res.status(404).json({ error: 'Salle non trouvée' });
        }

        const { nom, descrption, capacite, prix, adresse, proprietaireId } = req.body;

        await salle.update({
            nom: nom || salle.nom,
            descrption: descrption || salle.descrption,
            capacite: capacite || salle.capacite,
            prix: prix || salle.prix,
            adresse: adresse || salle.adresse,
            proprietaireId: proprietaireId || salle.proprietaireId
        });

        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE salle
router.delete('/:id', async (req, res) => {
    try {
        const salle = await Salle.findByPk(req.params.id);
        if (!salle) {
            return res.status(404).json({ error: 'Salle non trouvée' });
        }

        await salle.destroy();
        res.json({ message: 'Salle supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});











module.exports = router;
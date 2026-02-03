const express = require('express');
const router = express.Router();
const { Avis } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all avis
router.get('/', async (req, res) => {
    try {
        const avis = await Avis.findAll();
        res.json(avis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET avis by ID
router.get('/:id', async (req, res) => {
    try {
        const avi = await Avis.findByPk(req.params.id);
        if (!avi) {
            return res.status(404).json({ error: 'Avis non trouvé' });
        }
        res.json(avi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new avis - Client, Proprietaire, Admin
router.post('/', authMiddleware, async (req, res) => {
    try {
        if (!['client', 'proprietaire', 'administrateur'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        const { note, commentaire, utilisateurId, salleId } = req.body;

        // Validate required fields
        if (!note || !utilisateurId || !salleId) {
            return res.status(400).json({ error: 'note, utilisateurId, et salleId sont requis' });
        }

        // Validate note is between 1 and 5
        if (note < 1 || note > 5) {
            return res.status(400).json({ error: 'La note doit être entre 1 et 5' });
        }

        const avi = await Avis.create({
            note,
            commentaire,
            utilisateurId,
            salleId
        });
        res.status(201).json(avi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE avis - Client, Proprietaire, Admin
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        if (!['client', 'proprietaire', 'administrateur'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        const avi = await Avis.findByPk(req.params.id);
        if (!avi) {
            return res.status(404).json({ error: 'Avis non trouvé' });
        }

        // Check if user owns this avis (or is admin)
        if (req.user.role !== 'administrateur' && avi.utilisateurId !== req.user.id) {
            return res.status(403).json({ error: 'Vous pouvez modifier que vos avis' });
        }

        const { note, commentaire } = req.body;

        // Validate note if provided
        if (note && (note < 1 || note > 5)) {
            return res.status(400).json({ error: 'La note doit être entre 1 et 5' });
        }

        await avi.update({
            note: note || avi.note,
            commentaire: commentaire || avi.commentaire
        });

        res.json(avi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE avis - Client or Admin
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const avi = await Avis.findByPk(req.params.id);
        if (!avi) {
            return res.status(404).json({ error: 'Avis non trouvé' });
        }

        await avi.destroy();
        res.json({ message: 'Avis supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET avis by salle ID
router.get('/salle/:salleId', async (req, res) => {
    try {
        const avis = await Avis.findAll({
            where: { salleId: req.params.salleId }
        });
        res.json(avis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET avis by user ID
router.get('/utilisateur/:utilisateurId', async (req, res) => {
    try {
        const avis = await Avis.findAll({
            where: { utilisateurId: req.params.utilisateurId }
        });
        res.json(avis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;










module.exports = router;
const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all users - Admin only
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await Utilisateur.findAll();
        res.json({
            total: users.length,
            users
        });
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



// Activate/Deactivate user - Admin only
router.patch('/:id/status', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'administrateur') {
            return res.status(403).json({ error: 'Accès refusé - Admin uniquement' });
        }

        const user = await Utilisateur.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const { isActive } = req.body;
        if (isActive === undefined) {
            return res.status(400).json({ error: 'isActive is required' });
        }

        await user.update({ isActive });
        res.json({
            message: `Utilisateur ${isActive ? 'activé' : 'désactivé'} avec succès`,
            user
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});






module.exports = router;
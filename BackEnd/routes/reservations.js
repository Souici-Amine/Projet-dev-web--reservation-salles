const express = require('express');
const router = express.Router();
const { Reservation } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

// GET all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json({
            total: reservations.length,
            reservations
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET reservation by ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new reservation - Client, Proprietaire, Admin
router.post('/', authMiddleware, async (req, res) => {
    try {
        if (!['client', 'proprietaire', 'administrateur'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        const { date_debut, date_fin, utilisateurId, salleId } = req.body;

        // Validate required fields
        if (!date_debut || !date_fin || !utilisateurId || !salleId) {
            return res.status(400).json({ error: 'date_debut, date_fin, utilisateurId, et salleId sont requis' });
        }

        const reservation = await Reservation.create({
            date_debut,
            date_fin,
            utilisateurId,
            salleId
        });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// DELETE (cancel) reservation - Client, Proprietaire, Admin
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (!['client', 'proprietaire', 'administrateur'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        // Check if user owns this reservation
        if (req.user.role !== 'administrateur' && reservation.utilisateurId !== req.user.id) {
            return res.status(403).json({ error: 'Vous pouvez annuler que vos réservations' });
        }

        await reservation.destroy();
        res.json({ message: 'Réservation annulée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET reservations by user ID - Client, Proprietaire, Admin
router.get('/utilisateur/:utilisateurId', authMiddleware, async (req, res) => {
    try {
        if (!['client', 'proprietaire', 'administrateur'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        // Check if user is viewing their own reservations
        if (req.user.role !== 'administrateur' && parseInt(req.params.utilisateurId) !== req.user.id) {
            return res.status(403).json({ error: 'Vous pouvez consulter que vos réservations' });
        }
        const reservations = await Reservation.findAll({
            where: { utilisateurId: req.params.utilisateurId }
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET reservations by salle ID
router.get('/salle/:salleId', async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: { salleId: req.params.salleId }
        });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;










module.exports = router;
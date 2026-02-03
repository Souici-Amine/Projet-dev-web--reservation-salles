const express = require('express');
const router = express.Router();
const { Reservation } = require('../models');

// GET all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
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

// CREATE new reservation
router.post('/', async (req, res) => {
    try {
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

// UPDATE reservation
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        const { date_debut, date_fin } = req.body;

        await reservation.update({
            date_debut: date_debut || reservation.date_debut,
            date_fin: date_fin || reservation.date_fin
        });

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE (cancel) reservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        await reservation.destroy();
        res.json({ message: 'Réservation annulée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET reservations by user ID
router.get('/utilisateur/:utilisateurId', async (req, res) => {
    try {
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
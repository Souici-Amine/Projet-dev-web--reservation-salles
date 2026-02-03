const express = require('express');
const router = express.Router();
const { Reservation, Salle, Avis, Utilisateur } = require('../models');
const { Op } = require('sequelize');
const authMiddleware = require('../middlewares/authMiddleware');

// GET global statistics - Admin only
router.get('/global', authMiddleware, async (req, res) => {
    try {
        const totalReservations = await Reservation.count();
        const totalSalles = await Salle.count();
        const totalUsers = await Utilisateur.count();
        const totalAvis = await Avis.count();

        // Calculate total revenue
        const reservations = await Reservation.findAll({
            include: [{ model: Salle, attributes: ['prix'] }]
        });

        const totalRevenue = reservations.reduce((sum, res) => {
            return sum + (res.Salle ? parseFloat(res.Salle.prix) : 0);
        }, 0);

        // Average rating
        const avis = await Avis.findAll();
        const averageRating = avis.length > 0
            ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(2)
            : 0;

        res.json({
            totalReservations,
            totalSalles,
            totalUsers,
            totalAvis,
            totalRevenue: totalRevenue.toFixed(2),
            averageRating
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET statistics by proprietaire (owner) - Proprietaire only
router.get('/proprietaire/:proprietaireId', authMiddleware, async (req, res) => {
    try {
        const { proprietaireId } = req.params;

        // Get all salles for this proprietaire
        const salles = await Salle.findAll({
            where: { proprietaireId }
        });

        if (salles.length === 0) {
            return res.json({
                proprietaireId,
                totalSalles: 0,
                totalReservations: 0,
                totalRevenue: 0,
                totalAvis: 0,
                averageRating: 0
            });
        }

        const salleIds = salles.map(s => s.id);

        // Get reservations for these salles
        const reservations = await Reservation.findAll({
            where: { salleId: { [Op.in]: salleIds } },
            include: [{ model: Salle, attributes: ['prix'] }]
        });

        // Calculate revenue
        const totalRevenue = reservations.reduce((sum, res) => {
            return sum + (res.Salle ? parseFloat(res.Salle.prix) : 0);
        }, 0);

        // Get avis for these salles
        const avis = await Avis.findAll({
            where: { salleId: { [Op.in]: salleIds } }
        });

        const averageRating = avis.length > 0
            ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(2)
            : 0;

        res.json({
            proprietaireId,
            totalSalles: salles.length,
            totalReservations: reservations.length,
            totalRevenue: totalRevenue.toFixed(2),
            totalAvis: avis.length,
            averageRating
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET statistics by salle
router.get('/salle/:salleId', async (req, res) => {
    try {
        const { salleId } = req.params;

        const salle = await Salle.findByPk(salleId);
        if (!salle) {
            return res.status(404).json({ error: 'Salle non trouvée' });
        }

        const reservations = await Reservation.findAll({
            where: { salleId }
        });

        const avis = await Avis.findAll({
            where: { salleId }
        });

        const totalRevenue = (reservations.length * parseFloat(salle.prix)).toFixed(2);
        const averageRating = avis.length > 0
            ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(2)
            : 0;

        res.json({
            salleId,
            salleName: salle.nom,
            totalReservations: reservations.length,
            totalRevenue,
            totalAvis: avis.length,
            averageRating,
            prix: salle.prix,
            capacite: salle.capacite
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;










module.exports = router;
const express = require('express');
const router = express.Router();
const { Salle, Reservation } = require('../models');
const { Op } = require('sequelize');

// GET all salles with filtering and search
router.get('/', async (req, res) => {
    try {
        const { search, capacite_min, capacite_max, prix_min, prix_max, date_debut, date_fin } = req.query;

        let where = {};

        // Search by name or description
        if (search) {
            where[Op.or] = [
                { nom: { [Op.like]: `%${search}%` } },
                { descrption: { [Op.like]: `%${search}%` } }
            ];
        }

        // Filter by capacity
        if (capacite_min) {
            where.capacite = { [Op.gte]: parseInt(capacite_min) };
        }
        if (capacite_max) {
            where.capacite = where.capacite || {};
            where.capacite[Op.lte] = parseInt(capacite_max);
        }

        // Filter by price
        if (prix_min) {
            where.prix = { [Op.gte]: parseFloat(prix_min) };
        }
        if (prix_max) {
            where.prix = where.prix || {};
            where.prix[Op.lte] = parseFloat(prix_max);
        }

        let salles = await Salle.findAll({ where });

        // Filter by date availability
        if (date_debut && date_fin) {
            const startDate = new Date(date_debut);
            const endDate = new Date(date_fin);

            salles = salles.filter(async (salle) => {
                const conflictingReservations = await Reservation.findAll({
                    where: {
                        salleId: salle.id,
                        [Op.or]: [
                            {
                                date_debut: { [Op.lt]: endDate },
                                date_fin: { [Op.gt]: startDate }
                            }
                        ]
                    }
                });
                return conflictingReservations.length === 0;
            });
        }

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
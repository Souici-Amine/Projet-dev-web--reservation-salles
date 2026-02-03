const bcrypt = require("bcryptjs");
const { Utilisateur } = require("../models");
const { generateToken } = require("../utils/jwt");
//register controller
exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, mot_de_passe, role } = req.body;

        const existing = await Utilisateur.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: "Email already used" });
        }

        const user = await Utilisateur.create({
            nom,
            prenom,
            email,
            mot_de_passe,
            role
        });

        const token = generateToken(user);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//login controller
exports.login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        const user = await Utilisateur.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!valid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


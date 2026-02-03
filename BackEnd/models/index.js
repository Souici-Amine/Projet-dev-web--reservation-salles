const sequelize = require("../config/database");

const Utilisateur = require("./Utilisateur");
const Salle = require("./Salle");
const Reservation = require("./Reservation");
const Avis = require("./Avi");

/* === Associations === */

// Utilisateur ↔ Reservation
Utilisateur.hasMany(Reservation, { foreignKey: "utilisateurId" });
Reservation.belongsTo(Utilisateur, { foreignKey: "utilisateurId" });

// Salle ↔ Reservation
Salle.hasMany(Reservation, { foreignKey: "salleId" });
Reservation.belongsTo(Salle, { foreignKey: "salleId" });

// Utilisateur ↔ Avis
Utilisateur.hasMany(Avis, { foreignKey: "utilisateurId" });
Avis.belongsTo(Utilisateur, { foreignKey: "utilisateurId" });

// Salle ↔ Avis
Salle.hasMany(Avis, { foreignKey: "salleId" });
Avis.belongsTo(Salle, { foreignKey: "salleId" });

module.exports = {
    sequelize,
    Utilisateur,
    Salle,
    Reservation,
    Avis
};

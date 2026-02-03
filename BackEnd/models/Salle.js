const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Salle = sequelize.define('Salle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descrption: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    capacite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: true
    },
    proprietaireId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'salles',
    timestamps: false
});
module.exports = Salle;
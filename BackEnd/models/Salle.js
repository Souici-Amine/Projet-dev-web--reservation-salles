const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Salle = sequelize.define('Salle', {
    id: {
        type: DataTypes.INTEGER,
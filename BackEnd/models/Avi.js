const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Avi = sequelize.define('Avi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'avis',
    timestamps: false
});
module.exports = Avi;
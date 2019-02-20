const db = require('../db');
const Sequelize = require('sequelize');
const { User } = require('./User');

const Board = db.define('board', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   name: Sequelize.DataTypes.STRING(100)
});

Board.belongsTo(User, { onDelete: 'cascade' });
module.exports = { Board };
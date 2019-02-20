const db = require('../db');
const Sequelize = require('sequelize');
const { Board } = require('./Board');
const { User } = require('./User');

const Column = db.define('column', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    index: Sequelize.DataTypes.INTEGER,
    name: Sequelize.DataTypes.STRING(100)
});

Column.User = Column.belongsTo(User, { onDelete: 'cascade' });
Column.Board = Column.belongsTo(Board, { onDelete: 'cascade' });
Board.Columns = Board.hasMany(Column);

module.exports = { Column };
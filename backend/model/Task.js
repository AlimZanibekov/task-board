const db = require('../db');
const Sequelize = require('sequelize');
const { Column } = require('./Column');
const { Board } = require('./Board');
const { User } = require('./User');

const Task = db.define('task', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.DataTypes.STRING(100),
    description: {
        type: Sequelize.DataTypes.TEXT
    },
});

Task.Column = Task.belongsTo(Column, { onDelete: 'cascade' });
Task.User = Task.belongsTo(User, { onDelete: 'cascade' });
Column.Task = Column.hasMany(Task);
module.exports = { Task };
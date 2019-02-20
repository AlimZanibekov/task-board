const sequelize = require('../db');
const { Column } = require('../model/Column');
const { Task } = require('../model/Task');

const creatTask = ({ name, description, columnId, userId }) => {
    return sequelize.transaction(function (transaction) {
        return Promise.all([
            Column.findOne({ where: { id: columnId, userId }, transaction }).then(i => {
                if (i === null) throw new Error('Access denied');
            }),
            Task.create({
                columnId,
                name, description, userId
            }, {
                transaction
            })
        ]);
    }).then(([_, task]) => task ? task.get({ plain: true }) : null)
};

const editTask = ({ id, name, description, columnId, userId }) => {
    return Task.update({
        name, description, columnId
    }, {
        where: { id, userId },
        returning: true,
        plain: true
    }).then(res => res.pop())
};

const deleteTask = ({ id, userId }) => {
    return Task.destroy({
        where: { id, userId }
    })
};

module.exports = { creatTask, editTask, deleteTask };
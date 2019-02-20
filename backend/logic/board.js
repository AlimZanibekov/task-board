const sequelize = require('../db');
const { Board } = require('../model/Board');
const { Column } = require('../model/Column');

const createBoard = ({ name, userId }) => {
    return Board.create({
        name, userId,
        columns: [
            { name: 'To Do', index: 0, userId },
            { name: 'In Process', index: 1, userId },
            { name: 'Done', index: 2, userId }
        ]
    }, {
        include: Board.Columns
    }).then((board) => board ? board.get({ plain: true }) : null)
};

const editBoard = ({ id, name, userId }) => {
    return Board.update({
        name
    }, {
        where: { id, userId }
    }).then(() => true)
};

const addColumn = ({ name, boardId, index, userId }) => {
    return sequelize.transaction(function (transaction) {
        return Promise.all([
            Board.findOne({ where: { id: boardId, userId }, transaction }).then(i => {
                if (i === null) throw new Error('Access denied');
            }),
            Column.create({
                name, boardId, userId, index
            }, { transaction })
        ]);
    }).then(([_, column]) => column ? column.get({ plain: true }) : null)
};

const editColumn = ({ id, name, userId }) => {
    return Column.update({
        name, userId
    }, {
        where: { id, userId }
    }).then(() => true)
};

const sortColumns = ({ id: boardId, sort, userId }) => {
    return sequelize.transaction(function (transaction) {
        return Promise.all([sort.map((id, i) => Column.update({
                index: i
            }, {
                where: { id, boardId, userId },
                transaction
            }))
        ]);
    }).then(() => true)
};

const getAllBoards = (userId) => {
    return Board.findAll({
        where: { userId }
    });
};

const deleteBoard = ({ id, userId }) => {
    return Board.destroy({
        where: { id, userId }
    })
};

const deleteColumn = ({ id, userId }) => {
    return Column.destroy({
        where: { id, userId }
    })
};

const getBoard = ({ id, userId }) => {
    return Board.findOne({
        where: { id, userId },
        include: Board.Columns
    }).then(board => board ? board.get({ plain: true }) : null)
};

module.exports = { deleteColumn, addColumn, getAllBoards, getBoard, createBoard, deleteBoard, editBoard, sortColumns, editColumn };
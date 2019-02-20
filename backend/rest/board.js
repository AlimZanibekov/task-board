const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    deleteColumn, addColumn, editColumn,
    getAllBoards, createBoard, getBoard, editBoard,
    deleteBoard, sortColumns, editColumns
} = require('../logic/board');

router.use(passport.authenticate('jwt', { session: false }));

const success = { success: true };

router.get('/boards', async (req, res, next) => {
    try {
        const userId = req.user.id;
        const boards = await getAllBoards(userId);
        res.json(boards);
    } catch (e) {
        next(e)
    }
});

router.get('/boards/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const board = await getBoard({ id, userId });
        res.json(board);
    } catch (e) {
        next(e);
    }
});

router.post('/boards', async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const board = await createBoard({ name, userId });
        res.json(board)
    } catch (e) {
        next(e);
    }
});

router.delete('/boards/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await deleteBoard({ id, userId });
        res.json(success);
    } catch (e) {
        next(e);
    }
});

router.put('/boards', async (req, res, next) => {
    try {
        const { id, name } = req.body;
        const userId = req.user.id;
        await editBoard({ name, id, userId });
        res.json(success);
    } catch (e) {
        next(e);
    }
});

router.post('/boards/columns', async (req, res, next) => {
    try {
        const { name, boardId, index } = req.body;
        const userId = req.user.id;
        const column = await addColumn({ name, boardId, userId, index });
        res.json(column);
    } catch (e) {
        next(e);
    }
});

router.put('/boards/columns', async (req, res, next) => {
    try {
        const { id, name } = req.body;
        const userId = req.user.id;
        await editColumn({ id, userId, name });
        res.json(success);
    } catch (e) {
        next(e);
    }
});

router.delete('/boards/columns', async (req, res, next) => {
    try {
        const { id } = req.body;
        const userId = req.user.id;
        await deleteColumn({ id, userId });
        res.json(success);
    } catch (e) {
        next(e);
    }
});


router.put('/boards/columns/sort', async (req, res, next) => {
    try {
        const { id, sort } = req.body;
        const userId = req.user.id;
        await sortColumns({ id, sort, userId });
        res.json(success);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
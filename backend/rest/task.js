const passport = require('passport');
const express = require('express');
const router = express.Router();
const { creatTask, editTask, deleteTask } = require('../logic/task');

router.use(passport.authenticate('jwt', { session : false }));

const success = { success: true };

router.post('/task', async (req, res, next) => {
    try {
        const { name, description, columnId } = req.body;
        const userId = req.user.id;
        const task = await creatTask({ name, description, columnId, userId });
        res.json(task)
    } catch (e) {
        next(e);
    }
});

router.delete('/task/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await deleteTask({ id, userId });
        res.json(success);
    } catch (e) {
        next(e);
    }
});

router.patch('/task/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, columnId } = req.body;
        const userId = req.user.id;
        const task = await editTask({ id, name, description, columnId, userId });
        res.json(task);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
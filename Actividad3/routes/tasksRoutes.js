const express = require('express');
const { getTasks, getTask, updateTask, createTask, deleteTask } = require('../src/readFiles');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la API de tareas');
});

router.get('/tasks', async (req, res, next) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
        console.log('Tareas obtenidas');
    } catch (error) {
        next(error);
    }
});

router.get('/tasks/:id', async (req, res, next) => {
    try {
        const task = await getTask(parseInt(req.params.id));
        if (task) {
            res.json(task);
            console.log(task);
        } else {
            const error = new Error('Tarea no encontrada');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

router.put('/tasks/:id', async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.status) {
            const error = new Error('Faltan datos');
            error.name = 'ValidationError';
            throw error;
        }

        const task = await getTask(parseInt(req.params.id));

        if (task) {
            await updateTask(parseInt(req.params.id), req.body);
            res.json(req.body);
            console.log('Tarea actualizada');
        } else {
            const error = new Error('Tarea no encontrada');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

router.post('/tasks', async (req, res, next) => {
    try {
        if (req.body.id || !req.body.title || !req.body.description || !req.body.status) {
            const error = new Error('Faltan datos');
            error.name = 'ValidationError';
            throw error;
        }

        await createTask(req.body);
        res.json(req.body);
        console.log('Tarea creada');
    } catch (error) {
        next(error);
    }
});

router.delete('/tasks/:id', async (req, res, next) => {
    try {
        const task = await getTask(parseInt(req.params.id));

        if (task) {
            await deleteTask(parseInt(req.params.id));
            res.json(task);
            console.log('Tarea eliminada');
        } else {
            const error = new Error('Tarea no encontrada');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
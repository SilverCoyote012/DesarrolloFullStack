const express = require('express');
const { getUsers, getUser, updateUser, createUser, deleteUser } = require('../src/readUsers');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la API de usuarios');
});

router.get('/users', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.json(users);
        // console.log('Usuarios obtenidos');
    } catch (error) {
        next(error);
    }
});

router.get('/users/:id', async (req, res, next) => {
    try {
        const user = await getUser(parseInt(req.params.id));
        if (user) {
            res.json(user);
            // console.log('Usuario obtenido');
        } else {
            const error = new Error('Usuario no encontrado');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

router.put('/users/:id', async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            const error = new Error('Faltan datos');
            error.name = 'ValidationError';
            throw error;
        }

        const user = await getUser(parseInt(req.params.id));

        if (user) {
            await updateUser(parseInt(req.params.id), req.body);
            res.json(req.body);
            // console.log('Usuario actualizado');
        } else {
            const error = new Error('Usuario no encontrado');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

router.post('/users', async (req, res, next) => {
    try {
        if (req.body.id || !req.body.email || !req.body.password) {
            const error = new Error('Faltan datos');
            error.name = 'ValidationError';
            throw error;
        }

        const user = await createUser(req.body);
        res.json(user);
        // console.log('Usuario creado');
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:id', async (req, res, next) => {
    try {
        const user = await getUser(parseInt(req.params.id));
        if (user) {
            await deleteUser(parseInt(req.params.id));
            res.json(user);
            // console.log('Usuario eliminado');
        } else {
            const error = new Error('Usuario no encontrado');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
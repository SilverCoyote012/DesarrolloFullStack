const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, createUser, deleteUser } = require('../src/readUsers');

router.get('/', (req, res) => {
    res.send('Bienvenido a la API de usuarios');
});

router.post('/register', async (req, res, next) => {
    try {
        if (req.body.id || !req.body.email || !req.body.password) {
            const error = new Error('Faltan datos');
            error.name = 'ValidationError';
            throw error;
        }

        const users = await getUsers();
        const user = users.find(user => user.email === req.body.email);
        if (user) {
            const error = new Error('El email ya está registrado');
            error.name = 'ValidationError';
            throw error;
        }

        await createUser(req.body);
        res.json(req.body);
        // console.log('Usuario creado');
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            const error = new Error('Faltan datos');
            error.name = 'ValidationError';
            throw error;
        }

        const users = await getUsers();
        const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
        if (user) {
            res.json(user);
            // console.log('Sesion Iniciada');
        } else {
            const error = new Error('Usuario no encontrado');
            error.name = 'NotFoundError';
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
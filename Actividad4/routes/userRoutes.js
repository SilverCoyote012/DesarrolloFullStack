const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middlewares/auth');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Usuario creado correctamente', user: savedUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Usuario autenticado correctamente', token });
    } catch (error) {
        console.error('Error en el login', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.put('/users/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });

        res.status(200).json({ message: 'Usuario actualizado correctamente', user });
    } catch (error) {
        console.error('Error al actualizar usuario', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.delete('/users/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
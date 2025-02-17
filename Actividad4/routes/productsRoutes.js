const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const auth = require('../middlewares/auth');

router.post('/products', auth, async (req, res) => {
    try {
        const { name, description, price } = req.body;

        const newProduct = new Product({ name, description, price });
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Producto creado correctamente', product: savedProduct });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El producto ya está registrado' });
        }
    }
});

router.get('/products', auth, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.get('/products/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.put('/products/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });

        res.status(200).json({ message: 'Producto actualizado correctamente', product });
    } catch (error) {
        console.error('Error al actualizar producto', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.delete('/products/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;
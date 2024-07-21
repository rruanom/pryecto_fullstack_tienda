const provider = require('../models/providers.model');
const { validationResult } = require("express-validator");

const getAllProviders = async (req, res) => {
    try {
        const providers = await provider.getAllProviders();
        res.json(providers);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los proveedores' });
    }
};

const getProviderById = async (req, res) => {
    try {
        const { id } = req.params;
        const providerData = await provider.getProviderById(id);
        if (providerData) {
            res.json(providerData);
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el proveedor' });
    }
};

const createProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, cif, address } = req.body;
        const newProvider = await provider.createProvider(name, cif, address);
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el proveedor' });
    }
};

const updateProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const { name, cif, address } = req.body;
        const updatedProvider = await provider.updateProvider(id, name, cif, address);
        if (updatedProvider) {
            res.json(updatedProvider);
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
};

const deleteProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const result = await provider.deleteProvider(id);
        if (result) {
            res.json({ message: 'Proveedor eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Proveedor no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
};

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};
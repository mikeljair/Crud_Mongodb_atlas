const express = require('express');
const autenticar = require('../middleware/autenticacion');
const Usuario = require('../models/Usuario');

const router = express.Router();

// CREATE - Crear usuario (ya existe en auth.js, pero aquí está alternativa protegida)
router.post('/', autenticar, async (req, res) => {
  try {
    const { nombre, email } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya existe' });
    }

    const nuevoUsuario = new Usuario({ nombre, email });
    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario creado',
      usuario: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Obtener todos los usuarios
router.get('/', autenticar, async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Obtener un usuario por ID
router.get('/:id', autenticar, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Actualizar usuario
router.put('/:id', autenticar, async (req, res) => {
  try {
    const { nombre, email, activo } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, activo },
      { new: true }
    ).select('-contraseña');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Usuario actualizado',
      usuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar usuario
router.delete('/:id', autenticar, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Usuario eliminado exitosamente',
      usuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

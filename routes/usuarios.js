// routes/usuarios.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Criar novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    usuario = new Usuario({
      nome,
      email,
      senha
    });

    // Hash da senha antes de salvar o usuário
    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(senha, salt);

    await usuario.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro do servidor');
  }
});

// Listar usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;

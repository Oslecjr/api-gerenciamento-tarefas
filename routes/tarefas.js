const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

// Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const novaTarefa = new Tarefa(req.body);
    const tarefa = await novaTarefa.save();
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ler todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ler uma tarefa específica
router.get('/:id', getTarefa, (req, res) => {
  res.json(res.tarefa);
});

// Atualizar uma tarefa
router.patch('/:id', getTarefa, async (req, res) => {
  if (req.body.titulo != null) {
    res.tarefa.titulo = req.body.titulo;
  }
  if (req.body.descricao != null) {
    res.tarefa.descricao = req.body.descricao;
  }
  if (req.body.prioridade != null) {
    res.tarefa.prioridade = req.body.prioridade;
  }
  if (req.body.completa != null) {
    res.tarefa.completa = req.body.completa;
  }
  try {
    const updatedTarefa = await res.tarefa.save();
    res.json(updatedTarefa);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deletar uma tarefa
router.delete('/:id', getTarefa, async (req, res) => {
  try {
    await res.tarefa.remove();
    res.json({ message: 'Deleted Tarefa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para buscar tarefa por ID
async function getTarefa(req, res, next) {
  let tarefa;
  try {
    tarefa = await Tarefa.findById(req.params.id);
    if (tarefa == null) {
      return res.status(404).json({ message: 'Cannot find tarefa' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.tarefa = tarefa;
  next();
}

module.exports = router;

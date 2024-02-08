const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    default: ''
  },
  prioridade: {
    type: String,
    enum: ['Baixa', 'Média', 'Alta'],
    default: 'Média'
  },
  completa: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Tarefa', TarefaSchema);

require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const tarefasRouter = require('./routes/tarefas');
const usuariosRouter = require('./routes/usuarios');

app.use(express.json());

// DB Configuração usando variável de ambiente
const db = process.env.DB_URI;

// Conectando ao MongoDB usando variável de ambiente
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Use Routes
app.use('/api/usuarios', usuariosRouter);
app.use('/api/tarefas', tarefasRouter);

// Remova a duplicação da definição de porta
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

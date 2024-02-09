const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const tarefasRouter = require('./routes/tarefas');
const usuariosRouter = require('./routes/usuarios');

app.use(express.json());

// DB Configuaração
const db = 'mongodb+srv://CelsoFilho:9jee8URZ8FHSwh4B@apigerencdetarefas.i5dbuv8.mongodb.net/?retryWrites=true&w=majority';

// Conectando ao MongoDB
mongoose
  .connect('mongodb+srv://CelsoFilho:9jee8URZ8FHSwh4B@apigerencdetarefas.i5dbuv8.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));


// Use Routes

app.use('/api/usuarios', usuariosRouter);
app.use('/api/tarefas', tarefasRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

 

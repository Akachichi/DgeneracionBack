const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const noticiasRoutes = require('./routes/noticias.routes');
app.use('/api/noticias', noticiasRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API Noticias funcionando 🎉');
});

module.exports = app;
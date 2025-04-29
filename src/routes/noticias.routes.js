const express = require('express');
const router = express.Router();

// Importamos el controlador
const noticiasController = require('../controllers/noticias.controller');

// Definimos las rutas
router.get('/', noticiasController.getNoticias);
router.post('/', noticiasController.createNoticia);

module.exports = router;

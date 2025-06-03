import { Router } from 'express';
import { getNoticias, createNoticia } from '../controllers/noticias.controller.js';

const router = Router();

//Definicion de rutas
router.get('/', getNoticias);
router.post('/', createNoticia);

export default router;

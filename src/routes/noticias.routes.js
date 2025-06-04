import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getNoticias,
  createNoticia,
  getNoticiaPorId,
  updateNoticia,
} from "../controllers/noticias.controller.js";

const router = Router();

/**
 * Listar todas las noticias
 * GET /api/noticias
 */
router.get("/", getNoticias);

/**
 * Obtener una noticia por ID
 * GET /api/noticias/:id
 */
router.get("/:id", getNoticiaPorId);


/**
 * Crear una noticia
 * POST /api/noticias
 * (validaciones: titulo, contenido y autor son obligatorios)
 */
router.post(
  "/",
  body("titulo").notEmpty().withMessage('El campo "titulo" es obligatorio'),
  body("contenido")
    .notEmpty()
    .withMessage('El campo "contenido" es obligatorio'),
  body("volanta").notEmpty().withMessage('El campo "volanta" es obligatorio'),
  body("autor").notEmpty().withMessage('El campo "autor" es obligatorio'),
  (req, res, next) => {
    //Guardo todos los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, creamos un Error con propiedad errors (array)
      const error = new Error("Hay errores de validación");
      error.errors = errors.array();
      return next(error);
    }
    //Creo la noticia
    createNoticia(req, res, next);
  }
);

/**
 * Actualizar una noticia
 * PUT /api/noticias/:id
 */
router.put(
  "/:id",
  body("titulo").notEmpty().withMessage('El campo "titulo" es obligatorio'),
  body("contenido")
    .notEmpty()
    .withMessage('El campo "contenido" es obligatorio'),
  body("volanta").notEmpty().withMessage('El campo "volanta" es obligatorio'),
  body("autor").notEmpty().withMessage('El campo "autor" es obligatorio'),
  (req, res, next) => {
    //Guardo todos los errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si hay errores, creamos un Error con propiedad errors (array)
      const error = new Error("Hay errores de validación");
      error.errors = errors.array();
      return next(error);
    }
    updateNoticia(req, res, next);
  }
);

export default router;

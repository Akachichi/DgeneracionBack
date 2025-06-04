import Noticia from "../models/Noticia.js";
import mongoose from "mongoose";

const getNoticias = async (req, res, next) => {
  try {
    //Traemos todas las noticias
    const noticias = await Noticia.find().sort({ fecha: -1 });
    return res.json(noticias);
  } catch (err) {
    // Si algo sale mal, delegamos al middleware de error
    next(err);
  }
};

const getNoticiaPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validar que sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(`ID inválido: "${id}"`);
      error.statusCode = 400;
      return next(error);
    }
    //Vamos a buscar la noticia
    const noticia = await Noticia.findById(id);
    // Si no hay noticias devolvemos error
    if (!noticia) {
      res.status(404);
      return next(new Error("Noticia no encontrada"));
    }
    //Devolvemos la noticia encontrada
    return res.json(noticia);
  } catch (err) {
    //Tiramos error que no haya sido controlado antes
    next(err);
  }
};

const createNoticia = async (req, res, next) => {
  try {
    // Como ya esto fue validado entonces se hace el create de una
    const nuevaNoticia = await Noticia.create(req.body);
    return res.status(201).json(nuevaNoticia);
  } catch (err) {
    // Por si mongo tira algun error
    next(err);
  }
};

const updateNoticia = async (req, res, next) => {
  try {
    const { id } = req.params;    

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(`ID inválido: "${id}"`);
      error.statusCode = 400;
      return next(error);
    }

    const noticiaActualizada = await Noticia.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // new: devuelve el doc actualizado; runValidators: aplica el schema
    );

    if (!noticiaActualizada) {
      res.status(404);
      return next(new Error("No se encontró la noticia para actualizar"));
    }

    return res.json(noticiaActualizada);
  } catch (err) {
    next(err);
  }
};

export { getNoticias, createNoticia, getNoticiaPorId, updateNoticia };

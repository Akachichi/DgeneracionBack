import Noticia from '../models/Noticia.js';
import mongoose from 'mongoose';

const getNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.find().sort({ fecha: -1 });
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener noticias' });
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
      return next(new Error('Noticia no encontrada'));
    }
    //Devolvemos la noticia encontrada
    return res.json(noticia);
  } catch (err) {
    //Tiramos error que no haya sido controlado antes
    next(err);
  }
};

const createNoticia = async (req, res) => {
  try {
    const nuevaNoticia = new Noticia(req.body);
    await nuevaNoticia.save();
    res.status(201).json(nuevaNoticia);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear noticia' });
  }
};

export { getNoticias, createNoticia };

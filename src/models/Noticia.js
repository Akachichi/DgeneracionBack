import mongoose from "mongoose";

const noticiaSchema = new mongoose.Schema({
  publicada: Boolean ,
  titulo: {
    type: String,
    required: true,
  },
  volanta: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  imagenes: [{ src: String, portada: Boolean }],
});

const Noticia = mongoose.model("Noticia", noticiaSchema);

export default Noticia;

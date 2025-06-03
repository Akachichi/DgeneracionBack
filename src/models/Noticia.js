import mongoose from 'mongoose';

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  imagen: {
    type: String
  }
});

const Noticia = mongoose.model('Noticia', noticiaSchema);

export default Noticia;

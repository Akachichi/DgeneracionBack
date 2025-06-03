import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3000;

// Conexión a la base de datos y luego arrancamos el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});

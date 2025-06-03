import express from 'express';
import cors from 'cors';

import noticiasRoutes from './routes/noticias.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/noticias', noticiasRoutes);

//404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware general de manejo de errores
app.use(errorHandler);

export default app;
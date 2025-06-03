export const errorHandler = (err, req, res, next) => {
    
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let payload = { error: err.message || "Error inesperado en el servidor" };

  // 1) Validaciones (express-validator)
  if (err.errors && Array.isArray(err.errors)) {
    payload = {
      error: "Error de validación",
      details: err.errors.map((e) => ({ field: e.param, message: e.msg })),
    };
    res.status(400);
  }

  // 2) Mongoose ValidationError
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    payload = { error: "Error en validación de datos (Mongoose)", details };
    res.status(400);
  }

  // 3) Mongoose duplicate key (11000)
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    payload = {
      error: "Registro duplicado",
      details: [
        {
          field,
          message: `El valor para "${field}" debe ser único. Ya existe en la BD.`,
        },
      ],
    };
    res.status(400);
  }

  // 4) Mongoose CastError (ID inválido)
  if (err.name === "CastError") {
    payload = {
      error: "ID inválido",
      details: [
        {
          field: err.path,
          message: `No se encontró un registro válido con id: "${err.value}"`,
        },
      ],
    };
    res.status(400);
  }

  // 5) Errores de autenticación/autorización personalizados
  if (err.statusCode && [401, 403].includes(err.statusCode)) {
    payload = { error: err.message || "No autorizado" };
    res.status(err.statusCode);
  }

  // 6) Incluir stack solo en desarrollo
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
    console.error("⛔️ ERROR:", err);
  }

  return res.status(statusCode).json(payload);
};

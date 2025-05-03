const getNoticias = (req, res) => {
  res.json({ mensaje: "Acá iría la lista de noticias" });
};

const createNoticia = (req, res) => {
  const nuevaNoticia = req.body;
  // En un futuro, acá podrías guardarla en la base de datos
  res.status(201).json({
    mensaje: "Noticia creada correctamente",
    noticia: nuevaNoticia,
  });
};

module.exports = {
  getNoticias,
  createNoticia,
};

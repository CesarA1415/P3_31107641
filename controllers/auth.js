// Controlador de autenticación (placeholders)
// Implementa lógica real de register/login según sea necesario (hashing, JWT, DB, validaciones)

exports.register = async (req, res, next) => {
  // Ejemplo simple: devolver los datos enviados (no guardar en BD)
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  // En una implementación real aquí crearías el usuario
  res.status(201).json({ message: 'user registered (placeholder)', user: { username } });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  // Implementar verificación real. Aquí devolvemos un placeholder.
  res.status(200).json({ message: 'login successful (placeholder)', token: 'fake-jwt-token' });
};

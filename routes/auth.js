var express = require('express');
var router = express.Router();

// Ruta placeholder para autenticación
// Puedes expandir esto con login, register, etc.
router.post('/login', function(req, res, next) {
  res.status(200).json({ message: 'login placeholder' });
});

module.exports = router;

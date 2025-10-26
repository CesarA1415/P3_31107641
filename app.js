// Cargar variables de entorno lo antes posible
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');
// Lógica de rutas movida desde routes/auth.js y routes/users.js directamente a app.js
// Importar el controlador de autenticación
const authController = require('./controllers/auth');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Asignación P3',
      version: '1.0.0',
      description: 'Documentación de los endpoints de la asignación de la P3 (sobre y ping).',
    },
    servers: [
      {
        url: '/', // La ruta base
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del endpoint de la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/', indexRouter);
// 2. Usar las rutas directamente en app.js (antes estaban en /routes)
// Rutas de autenticación usando el controlador
app.post('/auth/register', authController.register); // Esta línea es CLAVE
app.post('/auth/login', authController.login); // Esta línea es CLAVE

// GET /users  (movido desde routes/users.js)
app.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

// Middleware para el endpoint /about
/**
 * @openapi
 * /about:
 *   get:
 *     summary: Información del Desarrollador
 *     description: Retorna los datos del desarrollador en el formato JSend "success".
 *     responses:
 *       200:
 *         description: Datos del desarrollador retornados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombreCompleto:
 *                       type: string
 *                       example: Tu Nombre Completo
 *                     cedula:
 *                       type: string
 *                       example: 12345678
 *                     seccion:
 *                       type: string
 *                       example: V01
 */
app.get('/about', (req, res, next) => {
    // Objeto de respuesta según el estándar JSend
    const jsendResponse = {
        status: "success",
        data: {
            nombreCompleto: "Cesar Jair Ascanio Torrealba",
            cedula: "31107641",
            seccion: "seccion 2"
        }
    };

    // Responder con el estado 200 OK y el objeto JSON
    res.status(200).json(jsendResponse);
});

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Health Check
 *     description: Responde con un estado 200 OK y cuerpo vacío para verificar que el servicio esté activo.
 *     responses:
 *       200:
 *         description: OK. El servicio está activo.
 */
app.get('/ping', (req, res, next) => {
    // Responder con el estado 200 OK y un cuerpo vacío
    res.status(200).end(); // .end() envía una respuesta sin datos
});

// Iniciar el servidor si este archivo se ejecuta directamente (por ejemplo en Render)
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

// Exportar la app para pruebas u otros usos (no impedirá que el servidor se inicie cuando
// el archivo se ejecute directamente gracias al chequeo anterior).
module.exports = app;

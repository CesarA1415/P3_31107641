const request = require('supertest');
const app = require('../app'); // La instancia de Express está en app.js

describe('Pruebas de la API', () => {

    // Prueba para GET /ping
    test('GET /ping debe responder con status 200 OK', async () => {
        const response = await request(app).get('/ping');
        // Verificamos que el estado dela respuesta sea 200
        expect(response.statusCode).toBe(200);
        // Opcional: Verificar que el cuerpo esté vacío
        expect(response.text).toBe('');
    });

    // Prueba para GET /about
    test('GET /about debe responder con status 200 y formato JSend "success"', async () => {
        const response = await request(app).get('/about');

        // 1. Verificar el status code
        expect(response.statusCode).toBe(200);

        // 2. Verificar el formato JSend y la estructura de datos
        expect(response.type).toBe('application/json');
        expect(response.body.status).toBe('success');
        expect(response.body.data).toBeDefined();

        // 3. Verificar que los campos requeridos estén presentes en data ok
        const data = response.body.data;
        expect(data.nombreCompleto).toBeDefined();
        expect(data.cedula).toBeDefined();
        expect(data.seccion).toBeDefined();
    });
});
const request = require('supertest');
const app = require('./app');

(async () => {
  try {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpass' })
      .set('Content-Type', 'application/json');
    console.log('STATUS:', res.status);
    console.log('BODY:', JSON.stringify(res.body));
  } catch (e) {
    console.error('ERROR:', e);
    process.exit(1);
  }
})();

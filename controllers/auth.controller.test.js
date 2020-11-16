const request = require('supertest');
const server = require('../server');

const BASE_PATH = '/covid/api/auth';

describe('AUTH', () => {
  it(BASE_PATH, (done) => {
    request(server).post(`${BASE_PATH}/login`)
      .send({
        folio: process.env.TEST_FOLIO,
        contrasenia: process.env.TEST_PASSWORD,
      })
      .then((response) => {
        expect(response.status).toBe(201);
      })
      .finally(() => done());
  });
});

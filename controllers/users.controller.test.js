const request = require('supertest');
const server = require('../server');

const BASE_PATH = '/covid/api/users';

describe(BASE_PATH, () => {
  it('SHOULD GET all users', (done) => {
    request(server).get(`${BASE_PATH}/`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).not.toBe(1);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => done());
  });
  it('SHOULD GET /:folio', (done) => {
    request(server).get(`${BASE_PATH}/${process.env.TEST_FOLIO}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.Folio).toBe(process.env.TEST_FOLIO);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => done());
  });

  it('SHOULD POST /', (done) => {
    request(server).post(`${BASE_PATH}/`)
      .send({
        Contrasenia: process.env.TEST_PASSWORD,
        Edad: 22,
        Sexo: 0,
        Latitud: '0.0',
        Longitud: '0.0',
      })
      .then((response) => {
        expect(response.status).toBe(200);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => done());
  });
});

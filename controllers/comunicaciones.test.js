const request = require('supertest');
const server = require('../server');

const BASE_PATH = '/covid/api/comunicaciones';

describe(BASE_PATH, () => {
  it('Should return 200 in GET', (done) => {
    request(server).get(BASE_PATH)
      .then((response) => {
        expect(response.status).toBe(200);
      })
      .finally(() => done());
  });
  it('Should return 201 in POST', (done) => {
    request(server).post(BASE_PATH)
      .send({
        IDComunicaciones: 1,
        Nombre: 'Prueba',
        Descripcion: 'Esto es ua prueba',
        Extras: '',
      })
      .then((response) => {
        expect(response.status).toBe(201);
      })
      .finally(() => done());
  });
  it('Should return 400 in POST', (done) => {
    request(server).post(BASE_PATH)
      .send({
        IDComunicaciones: 2,
        Extras: 1.0,
      })
      .then((response) => {
        expect(response.status).toBe(400);
      })
      .finally(() => done());
  });
  describe(`${BASE_PATH}/id/1`, () => {
    it('Should return 200 in PUT', (done) => {
      request(server).put(`${BASE_PATH}/id/1`)
        .send({
          IDComunicaciones: 1,
          Nombre: 'Prueba editada',
          Descripcion: 'Esto es ua prueba',
          Extras: 'Extra editado',
        })
        .then((response) => {
          expect(response.status).toBe(200);
        })
        .finally(() => done());
    });
    it('Should return 200 in GET', (done) => {
      request(server).get(`${BASE_PATH}/id/1`)
        .then((response) => {
          expect(response.status).toBe(200);
        })
        .finally(() => done());
    });
    it('Should return 200 in DELETE', (done) => {
      request(server).delete(`${BASE_PATH}/id/1`)
        .then((response) => {
          expect(response.status).toBe(200);
        })
        .finally(() => done());
    });
  });
});

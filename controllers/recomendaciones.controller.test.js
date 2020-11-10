const request = require('supertest');
const server = require('../server');

const BASE_PATH = '/covid/api/recomendaciones';

describe('Recoendaciones', () => {
  describe(`${BASE_PATH}`, () => {
    it('GET /', (done) => {
      request(server).get(`${BASE_PATH}/`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => done());
    });
  });

  describe(`${BASE_PATH}/id`, () => {
    it('GET /id/1', (done) => {
      request(server).get(`${BASE_PATH}/id/1`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => done());
    });
    it('POST, PUT, DELETE /', async (done) => {
      const id = -1;
      const post = await request(server).post(`${BASE_PATH}/`)
        .send({
          nivelRecomendaciones: '1',
          descripcion: 'Prueba',
          idRecomendaciones: id,
        });
      expect(post.status).not.toBe(400);
      const put = await request(server).put(`${BASE_PATH}/id/-1`)
        .send({
          nivelRecomendaciones: '1',
          descripcion: 'Prueba edit',
          idRecomendaciones: id,
        });
      expect(put.status).not.toBe(400);
      const del = await request(server).delete(`${BASE_PATH}/id/-1`);
      expect(del.status).not.toBe(400);
      done();
    });
  });

  describe(`${BASE_PATH}/nivel`, () => {
    it('GET /id/2', (done) => {
      request(server).get(`${BASE_PATH}/nivel/2`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => done());
    });
  });
});

const request = require('supertest');
const server = require('../server');

const BASE_PATH = '/covid/api/pruebas';
const AUTH_PATH = '/covid/api/auth';
let token = ""

describe('Pruebas', () => {
  beforeAll(async () => {
    await request(server)
    .post(`${AUTH_PATH}/login`)
    .send({
      folio: process.env.TEST_FOLIO,
      contrasenia: process.env.TEST_PASSWORD,
    }).then((response) => {
      token = `bearer ${response.body.encoded}`;
    });
  })

  describe(`${BASE_PATH}`, () => {
    it('GET /', (next) => {
      request(server).get(`${BASE_PATH}/`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
    });

    it('POST /', (next) => {
        request(server).post(`${BASE_PATH}/`)
        .set('Authorization', token)
        .send({
            folio: process.env.TEST_FOLIO,
            dolorSeveroPecho: 1,
            difExtremaRespirar: 0,
            desorientado: 0,
            respEstimulos: 0,
            olfato: 0,
            gusto: 0,
            fiebre: 0,
            escalofrios: 0,
            respiracion: 0,
            diarrea: 0,
            vomito: 0,
            tos: 0,
            dolorMuscular: 0,
            dolorCabeza: 0,
            irritacionOjos: 0,
            sangradoRespiratorio: 0,
            embarazada: 0,
            consumeTabaco: 1,
            enfCardiovascular: 0,
            diabetes: 0,
            cancer: 0,
            obeso: 0
        })
        .then((result) => {
            expect(result.status).toBe(200);
        })
        .finally(() => next());
      });

      it('Incorrect POST /', (next) => {
        request(server).post(`${BASE_PATH}/`)
        .set('Authorization', token)
        .send({
          folio: "NoFolio",
          dolorSeveroPecho: 1,
          difExtremaRespirar: 0,
          desorientado: 0,
          respEstimulos: 0,
          olfato: 0,
          gusto: 0,
          fiebre: 0,
          escalofrios: 0,
          respiracion: 0,
          diarrea: 0,
          vomito: 0,
          tos: 0,
          dolorMuscular: 0,
          dolorCabeza: 0,
          irritacionOjos: 0,
          sangradoRespiratorio: 0,
          embarazada: 0,
          consumeTabaco: 1,
          enfCardiovascular: 0,
          diabetes: 0,
          cancer: 0,
          obeso: 0
        })
        .then((result) => {
            expect(result.status).toBe(404);
        })
        .finally(() => next());
      });

      it('Incorrect POST /', (next) => {
        request(server).post(`${BASE_PATH}/`)
        .set('Authorization', token)
        .send({
            folio: process.env.TEST_FOLIO,
            dolorSeveroPecho: 1
        })
        .then((result) => {
            expect(result.status).toBe(400);
        })
        .finally(() => next());
      });
  });

  describe(`${BASE_PATH}/casos`, () => {
    it('GET /casos', (next) => {
      request(server).get(`${BASE_PATH}/casos`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
    });
  });

  describe(`${BASE_PATH}/id/:id`, () => {
    it('GET /id/:ID', (next) => {
      request(server).get(`${BASE_PATH}/id/13224`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
    });

    it('Incorrect GET /id/:ID', (next) => {
      request(server).get(`${BASE_PATH}/id/-100`)
        .then((result) => {
          expect(result.status).toBe(404);
        })
        .finally(() => next());
    });

    it('PUT /id/:ID', (next) => {
        request(server).put(`${BASE_PATH}/id/13224`)
        .set('Authorization', token)
        .send({
            folio: process.env.TEST_FOLIO,
            dolorSeveroPecho: 1,
            difExtremaRespirar: 1,
            desorientado: 1,
            respEstimulos: 1,
            olfato: 1,
            gusto: 1,
            fiebre: 1,
            escalofrios: 0,
            respiracion: 0,
            diarrea: 0,
            vomito: 0,
            tos: 0,
            dolorMuscular: 0,
            dolorCabeza: 0,
            irritacionOjos: 0,
            sangradoRespiratorio: 0,
            embarazada: 0,
            consumeTabaco: 1,
            enfCardiovascular: 0,
            diabetes: 0,
            cancer: 0,
            obeso: 0
        })
        .then((result) => {
            expect(result.status).toBe(200);
        })
        .finally(() => next());
    });

    it('Incorrect PUT /id/:ID', (next) => {
      request(server).put(`${BASE_PATH}/id/13224`)
      .set('Authorization', token)
      .send({
          folio: "NoFolio",
          obeso: 0
      })
      .then((result) => {
          expect(result.status).toBe(403);
      })
      .finally(() => next());
  });

    it('DELETE /id/:ID', (next) => {
      request(server).get(`${BASE_PATH}/id/13224`)
        .set('Authorization', token)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
    });

  });

  describe(`${BASE_PATH}/folio/:folio`, () => {
    it('GET /folio/:folio', (next) => {
      request(server).get(`${BASE_PATH}/folio/${process.env.TEST_FOLIO}`)
      .set('Authorization', token)
      .then((result) => {
        expect(result.status).toBe(200);
      })
      .finally(() => next());
    });

    it('DELETE /folio/:folio', (next) => {
        request(server).delete(`${BASE_PATH}/folio/${process.env.TEST_FOLIO}`)
        .set('Authorization', token)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
      });
  });

});

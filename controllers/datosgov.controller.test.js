const request = require('supertest');
const server = require('../server');

const BASE_PATH = '/covid/api/datosgov';
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
            estado: "Zacatecas",
            confirmados: 0,
            negativos: 0,
            sospechosos: 0,
            defunciones: 0,
            recuperados: 0,
            activos: 0,
            extra: "RegistroUnitTest"
        })
        .then((result) => {
            expect(result.status).toBe(200);
        })
        .finally(() => next());
      });
  });

  describe(`${BASE_PATH}/todos`, () => {
    it('GET /todos', (next) => {
      request(server).get(`${BASE_PATH}/todos`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
    });
  });

  describe(`${BASE_PATH}/entidad/:entidad`, () => {
    it('GET /entidad/:entidad', (next) => {
      request(server).get(`${BASE_PATH}/entidad/Zacatecas`)
        .then((result) => {
          expect(result.status).toBe(200);
        })
        .finally(() => next());
    });
  });

  describe(`${BASE_PATH}/entidad/:entidad/todos`, () => {
    it('GET /entidad/:entidad/todos', (next) => {
      request(server).get(`${BASE_PATH}/entidad/Zacatecas/todos`)
      .then((result) => {
        expect(result.status).toBe(200);
      })
      .finally(() => next());
    });
  });

  describe(`${BASE_PATH}/fecha/:anio/:mes/:dia`, () => {
    it('GET /fecha/:anio/:mes/:dia', (next) => {
      request(server).get(`${BASE_PATH}/fecha/2020/01/01`)
      .then((result) => {
        expect(result.status).toBe(200);
      })
      .finally(() => next());
    });
  });

  describe(`${BASE_PATH}/entidad/:entidad/fecha/:anio/:mes/:dia`, () => {
    it('GET /entidad/:entidad/fecha/:anio/:mes/:dia', (next) => {
      request(server).get(`${BASE_PATH}/entidad/Zacatecas/fecha/2020/01/01`)
      .then((result) => {
        expect(result.status).toBe(200);
      })
      .finally(() => next());
    });
  });

});

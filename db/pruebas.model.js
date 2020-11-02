const userHash = require('../utils/user.hash');
const queryGenerator = require('../utils/query.generator');
const escrutinioCalculator = require('../utils/escrutinio.calculator');

const QUERY_GET_PRUEBAS = 'SELECT * FROM Actualizaciones';
const QUERY_GET_PRUEBA_BY_ID = 'SELECT * FROM Actualizaciones WHERE idEncuesta = ?';
const QUERY_DELETE_PRUEBA_BY_ID = 'DELETE FROM Actualizaciones WHERE idEncuesta = ?';
const QUERY_GET_PRUEBAS_BY_FOLIO = 'SELECT * FROM Actualizaciones WHERE idUsuario = ?';
const QUERY_DELETE_PRUEBA_BY_FOLIO = 'DELETE FROM Actualizaciones WHERE idUsuario = ?';
const QUERY_AUTHZ = 'SELECT idEncuesta, idUsuario FROM Actualizaciones WHERE idUsuario=? AND idEncuesta=?';

/**
 * Obtiene todas las pruebas de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getPruebas(connection) {
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_PRUEBAS,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        results.forEach((prueba) => {
          prueba.folio = userHash.getFolioFromId(prueba.idUsuario);
          /* eslint no-param-reassign: ["error", { "props": false }] */
          delete prueba.idUsuario;
        });
        return resolve(results);
      },
    );
  });
}

/**
 * Obtiene una prueba de la base de datos por id.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getPruebaById(connection, idPrueba) {
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_PRUEBA_BY_ID, idPrueba,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return resolve();
        }
        results[0].folio = userHash.getFolioFromId(results[0].idUsuario);
        /* eslint no-param-reassign: ["error", { "props": false }] */
        delete results[0].idUsuario;
        return resolve(results[0]);
      },
    );
  });
}

/**
 * Obtiene todas las pruebas de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function postPrueba(connection, data) {
  const prueba = data;
  prueba.idUsuario = userHash.getIdFromFolio(prueba.folio);
  prueba.fechaCreacion = new Date();
  const escrutinio = escrutinioCalculator.compute(prueba);
  prueba.escrutinio = escrutinio;
  delete prueba.folio;

  
  return new Promise((resolve, reject) => {
    const query = queryGenerator.generateInsertQuery('Actualizaciones', prueba);
    connection.query(
      query.query,
      query.values,
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve({ escrutinio });
      },
    );
  });
}

/**
 * Obtiene todas las pruebas de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function deletePruebaById(connection, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_DELETE_PRUEBA_BY_ID,
      id,
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      },
    );
  });
}

/**
 * Obtiene todas las pruebas de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getPruebaByFolio(connection, folio) {
  const idUsuario = userHash.getIdFromFolio(folio);
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_PRUEBAS_BY_FOLIO,
      idUsuario,
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        results.forEach((prueba) => {
          prueba.folio = userHash.getFolioFromId(prueba.idUsuario);
          /* eslint no-param-reassign: ["error", { "props": false }] */
          delete prueba.idUsuario;
        });
        resolve(results);
      },
    );
  });
}

/**
 * Obtiene todas las pruebas de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function deletePruebaByFolio(connection, folio) {
  const idUsuario = userHash.getIdFromFolio(folio);
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_DELETE_PRUEBA_BY_FOLIO,
      idUsuario,
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      },
    );
  });
}

async function putPruebaById(connection, id, data) {
  const prueba = data;
  const escrutinio = escrutinioCalculator.compute(prueba);
  prueba.escrutinio = escrutinio;
  delete prueba.folio;

  const filter = {};
  filter.idEncuesta = parseInt(id, 10);
  return new Promise((resolve, reject) => {
    const generatedQuery = queryGenerator.generateUpdateQuery('Actualizaciones', prueba, filter);
    connection.query(
      generatedQuery.query,
      generatedQuery.values,
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.affectedRows !== 1) {
          reject();
          return;
        }
        resolve(escrutinio);
      },
    );
  });
}

async function verifyAccess(connection, resourceId, accessorId) {
  const userId = userHash.getIdFromFolio(accessorId);
  const dataToEscape = [
    userId,
    resourceId,
  ];
  console.log(dataToEscape);
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_AUTHZ,
      dataToEscape,
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.length === 0) {
          resolve(false);
          return;
        }
        resolve(true);
      },
    );
  });
}

module.exports = {
  getPruebas,
  getPruebaById,
  postPrueba,
  deletePruebaById,
  getPruebaByFolio,
  deletePruebaByFolio,
  putPruebaById,
  verifyAccess,
};

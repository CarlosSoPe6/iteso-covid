/* eslint linebreak-style: ["error", "windows"] */

const { getConnection } = require('../config/dbConfig');

const QUERY_GET_PRUEBAS = 'SELECT * FROM Actualizaciones';
const QUERY_GET_PRUEBA_BY_ID = 'SELECT * FROM Actualizaciones WHERE idEncuesta = ?';

/**
 * Obtiene todas las pruebas de la base de datos.
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getPruebas() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_PRUEBAS,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        results.forEach((prueba) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          delete prueba.idEncuesta;
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
async function getPruebaById(idPrueba) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_PRUEBA_BY_ID, idPrueba,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        /* eslint no-param-reassign: ["error", { "props": false }] */
        delete results[0].idEncuesta;
        delete results[0].idUsuario;
        return resolve(results[0]);
      },
    );
  });
}

module.exports = {
  getPruebas,
  getPruebaById,
};

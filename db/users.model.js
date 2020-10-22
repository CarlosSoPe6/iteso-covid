/* eslint linebreak-style: ["error", "windows"] */
const { getConnection } = require('../config/dbConfig');

const QUERY_USER_AUTH = 'SELECT IDUsuario, Contrasenia FROM Usuarios WHERE IDUsuario=? LIMIT 1;';
const QUERY_GET_USERS = 'SELECT * FROM Usuarios';

/**
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getUsers() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_USERS,
      (err, results) => {
        if (err) return reject(err);
        results.forEach((user) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          delete user.HabitosID;
          delete user.UserName;
        });
        return resolve(results);
      },
    );
  });
}

/**
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @param {import('mysql').PoolConnection} connection Conexión a usar
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getUserAuth(connection, IdUsuario) {
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_USER_AUTH,
      [IdUsuario],
      (err, results) => {
        if (err) return reject(err);
        results.forEach((user) => {
          delete user.HabitosID;
          delete user.UserName;
        });
        return resolve(results);
      },
    );
  });
}

module.exports = {
  getUsers,
  getUserAuth,
};

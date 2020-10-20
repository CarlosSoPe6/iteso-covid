const userHash = require('../utils/user.hash');

const QUERY_GET_USERS = 'SELECT * FROM Usuarios';
const QUERY_INSERT_USER = 'INSERT INTO Usuarios(`Contrasenia`, `Edad`, `Sexo`, `FechaCreacion`, `Latitud`, `Longitud`) VALUES (?, ?, ?, ?, ?, ?)';
const QUERY_GET_USER_BY_FOLIO = 'SELECT * FROM Usuarios WHERE IDUsuario = ?';

/**
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function getUsers(connection) {
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_USERS,
      (err, results) => {
        if (err) return reject(err);
        results.forEach((row) => {
          // eslint-disable-next-line no-param-reassign
          row.Folio = userHash.getFolioFromId(row.IDUsuario);
        });
        return resolve(results);
      },
    );
  });
}

async function getUserByFolio(connection, folio) {
  const id = userHash.getIdFromFolio(folio);
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_GET_USER_BY_FOLIO,
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        results.forEach((row) => {
          // eslint-disable-next-line no-param-reassign
          row.Folio = userHash.getFolioFromId(row.IDUsuario);
        });
        return resolve(results[0]);
      },
    );
  });
}

/**
 * @async
 * @exports
 * @throws {import('mysql').MysqlError}
 * @returns {Promise<Object>} Resultado de la consulta.
 */
async function postUser(connection, user) {
  const userData = [
    user.Contrasenia,
    user.Edad,
    user.Sexo,
    new Date(),
    user.Latitud,
    user.Longitud,
  ];
  return new Promise((resolve, reject) => {
    connection.query(
      QUERY_INSERT_USER,
      userData,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        // Map folio
        const folio = userHash.getFolioFromId(results.insertId);
        return resolve({ folio });
      },
    );
  });
}

module.exports = {
  getUsers,
  postUser,
  getUserByFolio,
};

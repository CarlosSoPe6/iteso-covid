const { getConnection } = require('../config/dbConfig');

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

module.exports = {
  getUsers,
};

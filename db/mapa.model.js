const { getConnection } = require('../config/dbConfig');

async function getRadio() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM datosgob', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  getRadio,
};

const { getConnection } = require('../config/dbConfig');

async function getAllFromAll() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM datosGob', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getLatestFromAll() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM datosGob', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(results);
      resolve(results);
    });
  });
}

module.exports = {
  getAllFromAll,
  getLatestFromAll,
};

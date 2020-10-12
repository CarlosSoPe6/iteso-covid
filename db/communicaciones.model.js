const { getConnection } = require('../config/dbConfig');

async function getAll() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getById(id) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('', [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function post(data) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function put(id, data) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function deleteById(id) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('', [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  getAll,
  getById,
  post,
  put,
  deleteById,
};

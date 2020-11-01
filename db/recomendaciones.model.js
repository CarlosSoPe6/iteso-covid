const QUERY_GET_ALL = 'SELECT * FROM recomendaciones';
const QUERY_POST = 'INSERT INTO recomendaciones (nivelRecomendaciones, descripcion) VALUES (?, ?)';
const QUERY_GET_BY_ID = 'SELECT * FROM recomendaciones WHERE IdRecomendaciones = ?';
const QUERY_PUT_BY_ID = 'UPDATE recomendaciones SET nivelRecomendaciones = ?, descripcion = ? WHERE IdRecomendaciones = ?';
const QUERY_DELETE_BY_ID = 'DELETE FROM recomendaciones WHERE IdRecomendaciones = ?';
const QUERY_GET_BY_NIVEL = 'SELECT * FROM recomendaciones WHERE nivelRecomendaciones = ?';

async function getAll(connection) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_ALL, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function postNew(connection, body) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_POST, [body.nivel, body.descripcion], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getByID(connection, id) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_BY_ID, id, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function putByID(connection, id, body) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_PUT_BY_ID, [body.nivel, body.descripcion, id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function deleteByID(connection, id) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_DELETE_BY_ID, id, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getByNivel(connection, nivel) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_BY_NIVEL, nivel, (err, results) => {
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
  postNew,
  getByID,
  putByID,
  deleteByID,
  getByNivel,
};

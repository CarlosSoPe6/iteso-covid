const { getConnection } = require('../config/dbConfig');

async function getAll() {
  const connection = await getConnection();

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Recomendaciones', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function postNew(body) {
  const connection = await getConnection();

  return new Promise((resolve, reject) => {
    const q = `INSERT INTO Recomendaciones (nivelRecomendaciones, descripcion) VALUES (${body.nivel}, '${body.descripcion}')`;

    connection.query(q, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getByID(id) {
  const connection = await getConnection();

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Recomendaciones WHERE IdRecomendaciones = ${id}`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function putByID(id, body) {
  const connection = await getConnection();

  return new Promise((resolve, reject) => {
    connection.query(`UPDATE Recomendaciones SET nivelRecomendaciones = ${body.nivel}, descripcion = '${body.descripcion}' WHERE IdRecomendaciones = ${id}`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function deleteByID(id) {
  const connection = await getConnection();

  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM Recomendaciones WHERE IdRecomendaciones = ${id}`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getByNivel(nivel) {
  const connection = await getConnection();

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Recomendaciones WHERE nivelRecomendaciones = ${nivel}`, (err, results) => {
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

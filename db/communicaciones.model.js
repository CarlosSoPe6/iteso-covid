const { getConnection } = require('../config/dbConfig');

async function getAll() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Comunicaciones', (err, results) => {
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
    connection.query('SELECT * FROM Comunicaciones WHERE IDComunicaciones = ?', [id], (err, results) => {
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
  const dataToInsert = [
    data.Nombre,
    data.Descripcion,
    data.Extras,
  ];
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO Comunicaciones (`Nombre`, `Descripcion`, `Extras`) VALUES (?, ?, ?)',
      dataToInsert,
      (err, results) => {
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
  const dataToInsert = [
    id,
    data.Nombre,
    data.Descripcion,
    data.Extras,
  ];
  return new Promise((resolve, reject) => {
    connection.query('UPDATE Comunicaciones SET Nombre=?, Descripcion=?, Extras=? WHERE IDComunicaciones=?',
      dataToInsert,
      (err, results) => {
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
    connection.query('DELETE FROM Comunicaciones WHERE IDComunicaciones = ?', [id], (err, results) => {
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

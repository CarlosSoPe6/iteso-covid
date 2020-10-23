const { getConnection } = require('../config/dbConfig');

async function getAllFromAll() {
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

async function getLatestFromAll() {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM datosgob WHERE fecha IN (SELECT MAX(fecha) FROM datosgob GROUP BY Estado) ORDER BY Estado', (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function postNew(data) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    const q = `INSERT INTO datosgob (fecha, Estado, Confirmados, Negativos, Sospechosos, Defunciones, Recuperados, Activos, Extra) VALUES (CURDATE(), '${data.estado}', ${data.confirmados}, ${data.negativos}, ${data.sospechosos}, ${data.defunciones}, ${data.recuperados}, ${data.activos}, '${data.extra}')`;
    connection.query(q, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getLatestByEntity(estado) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(`SELECT MAX(fecha) as fecha, id, Estado, Confirmados, Negativos, Sospechosos, Defunciones, Recuperados, Activos, Extra FROM datosgob WHERE Estado = '${estado}'`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getAllByEntity(estado) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM datosgob WHERE Estado = '${estado}'`, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getFromAllBySpecificDate(anio, mes, dia) {
  const connection = await getConnection();

  const d = new Date(anio, mes - 1, dia);
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM datosgob WHERE DATE(fecha) = ?', [d], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getByEntityBySpecificDate(estado, anio, mes, dia) {
  const connection = await getConnection();

  const d = new Date(anio, mes - 1, dia);

  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM datosgob WHERE DATE(fecha) = ? && Estado = ?', [d, estado], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  getAllFromAll,
  getLatestFromAll,
  postNew,
  getLatestByEntity,
  getAllByEntity,
  getFromAllBySpecificDate,
  getByEntityBySpecificDate,
};

const QUERY_GET_ALL = 'SELECT * FROM datosGob';
const QUERY_GET_LATEST_FROM_ALL = 'SELECT * FROM datosGob d INNER JOIN (SELECT Estado, MAX(fecha) AS MaxDate FROM datosGob GROUP BY estado) dg ON d.Estado = dg.Estado AND d.fecha = dg.MaxDate';
const QUERY_POST = 'INSERT INTO datosGob (fecha, Estado, Confirmados, Negativos, Sospechosos, Defunciones, Recuperados, Activos, Extra) VALUES (CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?)';
const QUERY_GET_LATEST_BY_ESTADO = 'SELECT * FROM datosGob d INNER JOIN (SELECT Estado, MAX(fecha) AS MaxDate FROM datosGob WHERE Estado = ?) dg ON d.Estado = dg.Estado AND d.fecha = dg.MaxDate';
const QUERY_GET_ALL_BY_ESTADO = 'SELECT * FROM datosGob WHERE Estado = ?';
const QUERY_GET_BY_DATE = 'SELECT * FROM datosGob WHERE DATE(fecha) = ?';
const QUERY_GET_BY_DATE_AND_ESTADO = 'SELECT * FROM datosGob WHERE DATE(fecha) = ? && Estado = ?';

async function getAllFromAll(connection) {
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

async function getLatestFromAll(connection) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_LATEST_FROM_ALL, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function postNew(connection, data) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_POST,
      [data.estado, data.confirmados, data.negativos, data.sospechosos,
        data.defunciones, data.recuperados, data.activos, data.extra],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
  });
}

async function getLatestByEntity(connection, estado) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_LATEST_BY_ESTADO, estado, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getAllByEntity(connection, estado) {
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_ALL_BY_ESTADO, estado, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getFromAllBySpecificDate(connection, anio, mes, dia) {
  const d = new Date(anio, mes - 1, dia);
  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_BY_DATE, [d], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function getByEntityBySpecificDate(connection, estado, anio, mes, dia) {
  const d = new Date(anio, mes - 1, dia);

  return new Promise((resolve, reject) => {
    connection.query(QUERY_GET_BY_DATE_AND_ESTADO, [d, estado], (err, results) => {
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

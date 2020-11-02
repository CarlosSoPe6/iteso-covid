const { getConnection } = require('../config/dbConfig');

async function getByRadio(radio) {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    let decimals;
    switch (radio) {
      case 'small':
        decimals = 3;
        break;
      case 'medium':
        decimals = 2;
        break;
      case 'large':
        decimals = 1;
        break;
      default:
        decimals = 6;
    }
    connection.query('SELECT actualizaciones.escrutinio, ROUND(usuarios.latitud, ?) AS latitud, ROUND(usuarios.longitud, ?) AS longitud, COUNT(*) as count FROM actualizaciones JOIN usuarios ON usuarios.IDUsuario = actualizaciones.idUsuario WHERE actualizaciones.escrutinio > 1 GROUP BY ROUND(usuarios.longitud, ?), ROUND(usuarios.latitud, ?), actualizaciones.escrutinio ORDER BY actualizaciones.escrutinio', [decimals, decimals, decimals, decimals], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  getByRadio,
};

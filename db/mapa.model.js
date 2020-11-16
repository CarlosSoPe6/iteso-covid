const QUERY_GET_BY_RADIO = `
SELECT 
  Actualizaciones.escrutinio,
  ROUND(Usuarios.latitud, ?) AS latitud,
  ROUND(Usuarios.longitud, ?) AS longitud,
  COUNT(*) as count 
FROM 
  Actualizaciones 
JOIN 
  Usuarios ON Usuarios.IDUsuario = Actualizaciones.idUsuario 
WHERE 
Actualizaciones.escrutinio > 1 
GROUP BY 
  ROUND(Usuarios.longitud, ?), 
  ROUND(Usuarios.latitud, ?), 
  Actualizaciones.escrutinio 
ORDER BY Actualizaciones.escrutinio;
`;

async function getByRadio(connection, radio) {
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
    connection.query(QUERY_GET_BY_RADIO,
      [decimals, decimals, decimals, decimals], (err, results) => {
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

function getFolioFromId(id) {
  const idHex = id.toString(16);
  let value = 'F';
  if (idHex.length < 8) {
    const zeros = 8 - idHex.length + 1;
    value += (Array(zeros).join('0') + idHex);
  }
  return value.toUpperCase();
}

function getIdFromFolio(folio) {
  const numericValue = folio.substring(1, folio.length);
  return parseInt(numericValue, 16);
}

module.exports = {
  getFolioFromId,
  getIdFromFolio,
};

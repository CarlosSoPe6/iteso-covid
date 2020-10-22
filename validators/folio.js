function validateFolio(folio) {
  const regex = new RegExp('^[F]{1}[0123456789ABCDEF]{8}$');
  const match = regex.test(folio);
  return match;
}

module.exports = {
  validateFolio,
};

const schema = require('../config/swagger.covid.json').definitions.Usuario;
const validator = require('./index');

function validate(data) {
  const validation = validator.validate(data, schema);
  if (validation.errors.length > 0) {
    return { valid: false, data: validation.errors };
  }
  return { valid: true, data };
}

function validateFolio(folio) {
  const regex = new RegExp('^[F]{1}[0123456789ABCDEF]{8}$');
  const match = regex.test(folio);
  return match;
}

module.exports = {
  validate,
  validateFolio,
};

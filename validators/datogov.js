const schema = require('../config/swagger.covid.json').definitions.DatosGobierno;
const validator = require('./index');

function validate(data) {
  const validation = validator.validate(data, schema);
  if (validation.errors.length > 0) {
    return { valid: false, data: validation.errors };
  }
  return { valid: true, data };
}

module.exports = {
  validate,
};

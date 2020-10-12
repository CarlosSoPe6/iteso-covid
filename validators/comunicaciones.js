const model = require('../db/communicaciones.model');

const schema = require('../config/swagger.covid.json').definitions.Comunicaciones;
const validator = require('./index');

async function exists(id) {
  const result = await model.getById(id);
  if (result.length === 0) {
    return false;
  }
  return true;
}

async function validate(data) {
  const validation = validator.validate(data, schema);
  if (validation.errors.length === 0) {
    return { valid: false, data: validation.errors };
  }
  return { valid: true, data };
}

module.exports = {
  validate,
  exists,
};

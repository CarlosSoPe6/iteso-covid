function generateColumns(columns) {
  return `(${columns.join(',')})`;
}

function generatePlaceholders(count) {
  // eslint-disable-next-line prefer-spread
  const values = Array.apply(null, { length: count }).map(Function.call, () => '?').join(',');
  return `(${values})`;
}

function generateKeypairPlaceholders(columns) {
  if (columns.length === 1) {
    return columns.map((key) => `${key} = ?`);
  }
  return columns.map((key) => `${key} = ?`).join(',');
}

function generateInsertQuery(table, data) {
  const keys = Object.keys(data);
  const columns = generateColumns(keys);
  const values = generatePlaceholders(keys.length);
  const items = [];
  keys.forEach((key) => {
    items.push(data[key]);
  });
  return { query: `INSERT INTO ${table}${columns} VALUES ${values}`, values: items };
}

function generateUpdateQuery(table, setData, whereData) {
  const setKeys = Object.keys(setData);
  const setPlaceholders = generateKeypairPlaceholders(setKeys);
  const whereKeys = Object.keys(whereData);
  const wherePlaceHolders = generateKeypairPlaceholders(whereKeys);
  const values = [];
  setKeys.forEach((key) => {
    values.push(setData[key]);
  });
  whereKeys.forEach((key) => {
    values.push(whereData[key]);
  });
  return { query: `UPDATE ${table} SET ${setPlaceholders}  WHERE ${wherePlaceHolders}`, values };
}

module.exports = {
  generateInsertQuery,
  generateUpdateQuery,
};

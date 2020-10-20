function generateColumns(columns) {
  return `(${columns.join(',')})`;
}

function generateValues(count) {
  // eslint-disable-next-line prefer-spread
  const values = Array.apply(null, { length: count }).map(Function.call, () => '?').join(',');
  return `(${values})`;
}

function generateInsertQuery(table, data) {
  const keys = Object.keys(data);
  const columns = generateColumns(keys);
  const values = generateValues(keys.length);
  const items = [];
  keys.forEach((key) => {
    items.push(data[key]);
  });
  return { query: `INSERT INTO ${table}${columns} VALUES ${values}`, values: items };
}

module.exports = {
  generateInsertQuery,
};

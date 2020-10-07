/**
 * Módulo main del proyecto iteso-covid
 */
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port} with ${process.env.NODE_ENV} envrioment`);
});

module.exports = app;

/* eslint linebreak-style: ["error", "windows"] */

/**
 * Módulo main del proyecto iteso-covid
 */
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const comunicacionesRouter = require('./routes/comunicaciones.router');
const pruebasRouter = require('./routes/pruebas.router');
const usersRouter = require('./routes/users.router');

app.use('/api/comunicaciones', comunicacionesRouter);
app.use('/api/pruebas', pruebasRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port} with ${process.env.NODE_ENV} envrioment`);
});

module.exports = app;

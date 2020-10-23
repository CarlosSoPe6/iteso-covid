/* eslint linebreak-style: ["error", "windows"] */

/**
 * Módulo main del proyecto iteso-covid
 */
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

const comunicacionesRouter = require('./routes/comunicaciones.router');
const pruebasRouter = require('./routes/pruebas.router');
const usersRouter = require('./routes/users.router');
const datosgovRouter = require('./routes/datosgov.router');
const recomendacionesRouter = require('./routes/recomendaciones.router');
const mapaRouter = require('./routes/mapa.router');

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use('/api/comunicaciones', comunicacionesRouter);
app.use('/api/pruebas', pruebasRouter);
app.use('/api/users', usersRouter);
app.use('/api/datosgov', datosgovRouter);
app.use('/api/recomendaciones', recomendacionesRouter);
app.use('/api/mapa', mapaRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port} with ${process.env.NODE_ENV} envrioment`);
});

module.exports = app;

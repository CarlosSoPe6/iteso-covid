/* eslint linebreak-style: ["error", "windows"] */

/**
 * Módulo main del proyecto iteso-covid
 */
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const authRouter = require('./routes/auth.router');
const comunicacionesRouter = require('./routes/comunicaciones.router');
const pruebasRouter = require('./routes/pruebas.router');
const usersRouter = require('./routes/users.router');
const datosgovRouter = require('./routes/datosgov.router');
const recomendacionesRouter = require('./routes/recomendaciones.router');
const mapaRouter = require('./routes/mapa.router');

app.use(express.json());

app.use('/covid/api/auth', authRouter);
app.use('/covid/api/comunicaciones', comunicacionesRouter);
app.use('/covid/api/pruebas', pruebasRouter);
app.use('/covid/api/users', usersRouter);
app.use('/covid/api/datosgov', datosgovRouter);
app.use('/covid/api/recomendaciones', recomendacionesRouter);
app.use('/covid/api/mapa', mapaRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${port} with ${process.env.NODE_ENV} envrioment`);
});

module.exports = app;

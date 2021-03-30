'use strict'
const express = require('express');
const createError = require('http-errors');
const indexRoutes = require('./routes');
const helloRoutes = require('./routes/hello');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', indexRoutes);
app.use('/hello', helloRoutes);


app.use((req, res, next) => {
  if(req.method !== 'GET') {
    next(createError(405));
    return;
  }
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log('error status: ', err.status);
  res.status(err.status || 500);
  res.send(err.message);
});





app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
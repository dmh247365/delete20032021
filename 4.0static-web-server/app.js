'use strict'
const express = require('express');
const createError = require('http-errors');
const path = require('path');

const indexRoutes = require('./routes');
const helloRoutes = require('./routes/hello');
const meRoutes = require('./routes/me');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)
app.use('/hello', helloRoutes)
app.use('/me', meRoutes)


app.use((req, res, next) => {
  if(req.method !== 'GET') {
    next(createError(405));
    return;
  }
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
res.send(err.message)
})




app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
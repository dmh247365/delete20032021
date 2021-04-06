const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const got = require('got');
const fetch = require('node-fetch');

const rootRouter = require('./routes/root');
//const tempRootRouter = require('./routes/route2working');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// app.use('/', (req, res, next) => {
//   if(req.method !== 'GET') {
//     const err = new Error("Must be a GET request!")
//     err.status = 403;
//     next(err)
//     return;
//   };
//   next();
// });



//app.use('/', rootRouter);
//app.use('/', tempRootRouter);
app.use('/', rootRouter);


app.use('/', (req, res, next) => {
  if(req.method !== 'GET') return next(createError(403, "Must be a GET request!"));
    next()
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("in in the line 45 catvh");
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  console.log('im in the app.js error catch all');
  res.status(err.status || 500);
  res.send({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
});


module.exports = app;
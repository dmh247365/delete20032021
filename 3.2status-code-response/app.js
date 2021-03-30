const express = require('express');
const createError = require('http-errors');

const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', function(req, res, next) {
  res.send('<h1>Hello</h1>')
});

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

app.listen(PORT, console.log(`Listening on port ${PORT}.....`));
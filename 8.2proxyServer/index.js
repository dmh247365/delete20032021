const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const createError = require('http-errors');

// Create the Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://jsonplaceholder.typicode.com';

// Logging
app.use(morgan('dev'));

app.use('/', (req, res, next) => {
  if(req.method !== 'GET') {
    next(createError(405));
  };
  next();
});

app.use('/todos', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
}));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log('error status: ', err.status);
res.status(err.status || 500);
res.send(err.message);
});


app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

// 1 - npm start
// 2 - in another terminal do $node -e "http.get('http://localhost:3000/todos/1', (res) => res.pipe(process.stdout))"

// it will return 
// {
// "userId": 1,
// "id": 1,
// "title": "delectus aut autem",
// "completed": false
// }

'use strict'
const { read } = require('fs');
const http = require('http');
const url = require('url');
const colors = ['Yellow', 'Red', 'Orange', 'Green', 'Blue', 'Indigo'];
const MISSING = 2;

const server = http.createServer((req, res) => {
  console.log('im in the bicycle service');
  const pathId = req.url;
  let id = pathId.match(/^\/(\d+)$/);
  if (!id) {
    console.log('will be returning a 400!!');
    res.statusCode = 400;
    console.log('** res: ', res.statusCode)
    return void res.end();
    
    // res.setHeader('Content-Type', 'application/json');
    // return res.end(JSON.stringify({message:'something is a kinda wrong'}));
  }

  id = Number(id[1]);

  if (id === MISSING) {
    console.log('will be returning a 404!!');
    res.statusCode = 404;
    return void res.end();
    
  //   res.setHeader('Content-Type', 'application/json');
  //   return res.end(JSON.stringify({message:'something is a kinda wrong'}));
  };

  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify({
    id: id,
    color: colors[id % colors.length]
  }));
});

server.listen(process.env.PORT || 0, () => {
  const { port } = server.address();
  console.log('Bicycle service listening on localhost on port: ' + port);
});


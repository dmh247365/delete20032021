'use strict'
const express = require('express');
const router = express.Router();
const finished = require('stream').finished;
const stream = require('../stream');

router.get('/', function(req, res, next) {
  const finalStream = stream();
  console.log(finalStream);
  finalStream.pipe(res, { end: false })

  finished(finalStream, (err) => {
    if(err) {
      next(err)
      return
    }
    console.log('thats me done!')
    res.end()
  })
});


module.exports = router;
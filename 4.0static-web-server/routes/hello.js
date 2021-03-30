'use strict'
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  console.log('request query', req.query);
 const  salutation = 'greeting' in req.query ? req.query.greeting : 'Hello spud';
  res.render('hello', { greeting: salutation });
});

// whatever the variable salutation is, it will be available on our hello view under the property of greeting.

module.exports = router;
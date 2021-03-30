var express = require('express');
var router = express.Router();
var model = require('../model');
var { check, body, validationResult } = require('express-validator');

/* GET  bicycle listing. */
router.get('/:id', function(req, res, next) {
  model.bicycle.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') next();
      else next (err);
    } else {
      res.send(result);
    }
  });
});

validateEntry = [
  body('brand').not().isEmpty().isString(),
  body('color').not().isEmpty().isString(),
]


router.post(
  '/blarg',
  [
    body('brand').not().isEmpty().isString(),
    body('color').not().isEmpty().isString(),
  ],
  function (req, res, next) {
    console.log("req.body: ",req.body);
    
    // console.log("req.body.data ", req.body.data);
    const errors = validationResult(req);
    console.log('** errors ** ', errors);
    if (!errors.isEmpty()){
      console.log('this is err: ', err);
      next(err);
    }
    var id = model.bicycle.uuid();
    model.bicycle.create(id, req.body.data, (err) => {
      if (err) next (err);
      else res.status(201).send({id});
      });
  }
);



router.post('/', function (req, res, next) {
  var id = model.bicycle.uuid();
  console.log("req.body: ",req.body);
  console.log("req.body.data ", req.body.data);
  model.bicycle.create(id, req.body.data, (err) => {
    if (err) next (err);
    else res.status(201).send({id});
    });
});

router.post('/:id/update', function(req, res, next) {
  model.bicycle.update(req.params.id, req.body.data, (err) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.status(204).send();
    }
  });
});

router.put('/:id/', function(req, res, next) {
  model.bicycle.create(req.params.id, req.body.data, (err) => {
    if (err) {
      if(err.message === 'resource exists') {
        model.bicycle.update(req.params.id, req. body.data, (err) => {
          if (err) next (err);
          else res.status(204).send();
        });
      } else {
        next (err);
      }
    } else {
      res.status(201).send({});
    }
  });
});

router.delete('/:id', function(req, res, next) {
  model.bicycle.del(req.params.id, (err) => {
    if (err) {
      if (err.message === 'not found') next ();
      else next (err);
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;

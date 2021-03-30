var express = require('express');
var router = express.Router();
var model = require('../model');


function hasOwnProperty (o, p) {
  return Object.prototype.hasOwnProperty.call(o, p);
}

function validateData (o) {
  var valid = o !== null && typeof o === 'object';
  valid = valid && hasOwnProperty(o, 'brand');
  valid = valid && hasOwnProperty(o, 'color');
  valid = valid && typeof o.brand === 'string';
  valid = valid && typeof o.color === 'string';
  return valid && {
    brand: o.brand,
    color: o.color
  };
}

function validateBody (o) {
  var valid = 0 !== null && typeof o === 'object';
  valid = valid && hasOwnProperty(o, 'data');
  valid = valid && o.data !== null && typeof o.data === 'object';
  var data = valid && validateData(o.data);
  return valid && data && {
    data: data
  };
}

function badRequest() {
  const err = new Error('Bad Request');
  err.status = 400;
  return err;
}


/* GET boat listing. */
router.get('/:id', function(req, res, next) {
  model.boat.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === 'not found') next();
      else next(err);
    } else {
      res.send(result);
    }
  });
});


router.post('/', function(req, res, next) {
  var id = model.boat.uid();
  var body = validateBody(req.body);
  if (body) {
    model.boat.create(id, body.data, (err) => {
      if (err) next(err);
      else res.status(201).send({id});
    });
  } else {
    next(badRequest());
  }
});
 
router.post('/:id/update', function(req, res, next) {
  var body = validateBody(req.body);
  if (body) {
    model.boat.update(req.params.id, body.data, (err) => {
      if (err) {
        if(err.message === 'not found') next();
        else next (err);
      } else {
        res.status(204).send();
      }
    });
  } else {
    next(badRequest());
  }
});


router.put('/:id', function (req, res, next) {
  var body = validateBody(body);
  if(body) {
    model.boat.create(req.params.id, body.data, (err) => {
      if (err) {
        if(err.message === 'resource exists') {
          model.boat.update(req.params.id, body.data, (err) => {
            if (err) next (err);
            else res.status(204).send();
          });
        } else {
          next(err);
        } 
      } else {
        res.status(201).send({});
      }
    });
  } else {
    next(badRequest());
  }
});

router.delete('/:id', function(req, res, next) {
  model.boat.del(req.params.id, (err) => {
    if(err) {
      if(err.message === 'not found') next();
      else next(err);
    } else {
      res.status(204).send();
    }
  });
});


module.exports = router;

'use strict'
// const got = require('got');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const fetch = require('node-fetch');

const {
  BICYCLE_SERVICE_PORT = 4000,
  BRAND_SERVICE_PORT = 5000
} = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;



router.get('/:id', async function(req, res, next) {
  console.log('hello from inside root/get');
  let { id } = req.params;
  // console.log(typeof id);
  // id = Number(id);
  //console.log('id converted: ', id);
  //console.log(typeof id);
  //if(!Number.isInteger(id)) return res.status(400).send({message: "Give me an integer"})
  //console.log('id: ', id);
  console.log('bicycleSrv: ', bicycleSrv);
  console.log('brandSrv: ', brandSrv);

  // new
  function checkResponseStatus(res) {
    console.log('im the value of res.ok: ', res.ok)
    console.log('res status code in checkfunction:',res.statusCode)
    if(res.ok) {
      return res;
    } else {
      createError(res.statusCode);
    }
  }
  // new

  try {
    // const brand = await fetch(`${brandSrv}/${id}`)
    // .then(res => res.json());
    // const bicycle = await fetch(`${bicycleSrv}/${id}`)
    // .then(res => res.json());
  
    const brand = await fetch(`${brandSrv}/${id}`)
      .then(checkResponseStatus)
      .then(res => res.json());
    const bicycle = await fetch(`${bicycleSrv}/${id}`)
      .then(checkResponseStatus)
      .then(res => res.json());
  
    return res.send({
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.name,
      });

  } catch(err) {
    console.log("im in the catch err")
    console.log("im the err.res : ", err.name);
    console.log("err response message ", err.message);
    console.log("err response response ", err.response);

    if(err.name && err.name === 'FetchError') return res.status(404).send({message: "Not Found"})
    if(!err.response) return res.status(500).send({message: "error"});
    next(err)
  }
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(400));
});





module.exports = router;

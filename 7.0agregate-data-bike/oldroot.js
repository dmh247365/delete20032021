'use strict'
const got = require('got');
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { HttpError } = require('http-errors');

const {
  BICYCLE_SERVICE_PORT = 4000,
  BRAND_SERVICE_PORT = 5000
} = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

console.log('bicycleSrv: ', bicycleSrv);

router.get('/:id', async function(req, res, next) {
  console.log('hello from inside root/get');
  const { id } = req.params;
  console.log('id: ', id);
  console.log('bicycleSrv: ', bicycleSrv);
  console.log('brandSrv: ', brandSrv);
  try {
    const brand = await got(`${brandSrv}/${id}`).json();
    console.log("brand: ", brand);
    const bicycle = await got(`${bicycleSrv}/${id}`).json();
    console.log("bicycle: ", bicycle);
  
    return res.send({
        id: bicycle.id,
        color: bicycle.color,
        brand: brand.brand,
      });
  
  
  // try {
  //   const [ brand, bicycle ] = await Promise.all([
  //     got(`${brandSrv}/${id}`).json(),
  //     got(`${bicycleSrv}/${id}`).json(),
  //   ])
  //   return res.send({
  //     id: bicycle.id,
  //     color: bicycle.color,
  //     brand: brand.brand,
  //   });
  // } catch(err) {
  //   res.status(500).send({message: "error"})
  // }
  } catch(err) {
    console.log("im in the catch err")
    console.log("im the got err: ", err);
    console.log("err response code ", err.message);
    if(!err.response || err.response.statusCode) return res.status(500).send({message: "error"});
    if(err.response.statusCode === 404) return res.status(404).status({message: "Not Found"})
    if(err.response.statusCode === 400) return res.status(400).status({message: "Bad Request"})
    next(err)
  }
});




module.exports = router;

'use strict'
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
//const fetch = require('node-fetch');
const got = require('got');

const {
  BICYCLE_SERVICE_PORT = 4000,
  BRAND_SERVICE_PORT = 5000
} = process.env;

const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;


router.get('/:id', async function(req, res, next) {
  let { id } = req.params;
  console.log('id: ', id);
  console.log('bicycleSrv: ', bicycleSrv);
  //console.log('brandSrv: ', brandSrv);
  try {
    //const bike2 = await got(`${bicycleSrv}/${id}`, {json: true});
    const bike2 = await got(`${bicycleSrv}/${id}`); // would this be async??
    //const result = await bike2.json();
    console.log("****************");
    console.log('bike2 result: ', bike2);
    console.log('bike2 body ', bike2.body);
    console.log('bike2 statusCode ', bike2.statusCode);
    console.log('bike2 header ', bike2.header);
    console.log('bike json ', bike2.json());
    
    
    if(bike2.statusCode === 404 || bike2.statusCode === 400) {
      return next(createError(bike2.statusCode))

    }
    
    
    // const bikeStatus2 = await bike.status
    // if(bikeStatus2 === 404 || bikeStatus2 === 400) {
    //   console.log(`returned ${bikeStatus2}`)
    //   return next(createError(bikeStatus2))
    // }
  } catch(err) {
    console.log('in the route2 error catch', err.status);
    if(err.status) next(createError(err.status))
    else next(createError())
  }




/*
router.get('/:id', async function(req, res, next) {
  let { id } = req.params;
  console.log('id: ', id);
  console.log('bicycleSrv: ', bicycleSrv);
  console.log('brandSrv: ', brandSrv);
  try {
    const bike = await fetch(`${bicycleSrv}/${id}`);
    const bikeStatus = await bike.status
    if(bikeStatus === 404 || bikeStatus === 400) {
      console.log(`returned ${bikeStatus}`)
      return next(createError(bikeStatus))
    }
    bikeJson = await bike.json();
    const brand = await fetch(`${ brandSrv}/${id}`);
    const brandStatus = await brand.status
    if(brandStatus === 404 || brandStatus === 400) {
      console.log(`returned ${brandStatus}`)
      return next(createError(brandStatus))
    }
    console.log('**************');
    console.log('bike ', bike)
    console.log('bikeJson ', bikeJson)

    return res.send({
      id: bike.id,
      color: bike.color,
      brand: brand.brand,
    });
    // const bikeJson = await bike.json();
    // console.log('this is bike ', status);
    // console.log('this is bike in json', bikeJson);
    // return res.send(bike);
  // } catch(err){
  // }
    //.then(result => console.log('promise result status ',result.json()))
  //.then(res => res.json())
  //.then(json => console.log(json))
  // } catch(err) {
  //   console.log('err message: ', err.message);
  //   // generate error ie error from server!!
  // }


//   try {
//     const bicycle = await fetch(`${bicycleSrv}/${id}`)
//     .then(res => res.json())
//     .then(res => console.log(res.body));
  
//     return res.send({
//         id: bicycle.id,
//         color: bicycle.color 
//       });

//   } catch(err) {
//     console.log("im in the catch err")
//     console.log("im the err: ", err);
//     console.log("err response message ", err.message);
//     console.log("err response response ", err.response);

//     if(err.name && err.name === 'FetchError') return res.status(404).send({message: "Not Found"})
//     if(!err.response) return res.status(500).send({message: "error"});
//     next(err)
//   }
// });

// // catch when route not used
// // ie no id present
// router.use(function(req, res, next) {
//   console.log('im in route2working error catcher');
//   next(createError(400));
*/
});





module.exports = router;

function validateBody (o) {
  var valid = false;

  return valid && {
    brand: o.brand,
    color: o.color
  };
}

const obje = { brand: "yes", color: "red"}

result = validateBody(obje);
console.log(result);

// function convert(name){
//   var parts = name.split(' ');
//   var last = parts.pop();
//   var first = parts.shift();
//   return {
//     first:first,
//     last:last
//   };
// };

// var req1 = {
//       query: {name:"dave mark hale"}
//     }

// var req2 = {
//     query: { name:["dave mark hale","doh!"]}
//   }

// console.log(convert(req2.query.name[0]));




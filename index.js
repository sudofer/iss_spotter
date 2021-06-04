// index.js
const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Your IP is", ip);

//   fetchCoordsByIP(ip, (error, coords) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(coords);
//     }
//     fetchISSFlyOverTimes(coords, (error, data) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(JSON.parse(data).response);
//       }
//     });
//   });
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("it didnt work!", error);
  } else {
    console.log(passTimes);
  }
});

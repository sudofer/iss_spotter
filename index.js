// index.js
const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Your IP is", ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log(error);
    } else {
      console.log(coords);
    }
  });
});

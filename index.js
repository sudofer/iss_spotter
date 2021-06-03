// index.js
const { fetchMyIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Your IP is", JSON.parse(ip).ip);
});

const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  request(
    "https://api.ipify.org?format=json",
    function (error, response, body) {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        return callback(Error(msg), null);
      }
      if (!error) {
        const ip = JSON.parse(body).ip;
        return callback(null, ip);
      } else {
        return callback(error, null);
      }
    }
  );
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, function (error, response, body) {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(msg, null);
    }
    if (error) {
      return callback(error, null);
    } else {
      const parsed = JSON.parse(body);
      const lat = parsed.latitude;
      const long = parsed.longitude;
      const coords = {};
      coords["latitude"] = lat;
      coords["longitude"] = long;
      return callback(null, coords);
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    function (error, response, body) {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        return callback(msg, null);
      }
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, body);
      }
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, nul);
    } else {
      callback(null, ip);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, coords);
      }
      fetchISSFlyOverTimes(coords, (error, data) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, JSON.parse(data).response);
        }
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};

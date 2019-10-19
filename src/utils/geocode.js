const request = require('request');
const keys = require('../api/keys');
const geocodeKey = process.env.MAPBOX_TOKEN || keys.mapboxTokenKey;

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json`;
  request(
    {
      url: geocodeURL,
      json: true,
      qs: { access_token: geocodeKey, limit: 1 }
    },
    (error, response) => {
      if (error) return callback('Unable to connect to location service!');
      else if (response.body.features.length === 0)
        return callback('Unable to find location. Try another search.');

      const [long, lat] = response.body.features[0].center;
      const location = response.body.features[0].place_name;
      callback(undefined, { lat, long, location });
    }
  );
};

module.exports = geocode;

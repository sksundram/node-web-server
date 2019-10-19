const request = require('request');
// const keys = require('../api/keys');
const forecastKey = process.env.DARKSKY_API_KEY;

const forecast = (lat, long, callback) => {
  const forecastURL = `https://api.darksky.net/forecast/${forecastKey}/${lat},${long}`;
  request(
    { url: forecastURL, json: true, qs: { units: 'si' } },
    (error, response) => {
      if (error) return callback('Unable to connect to weather service!');
      else if (response.body.error) return callback('Unable to find location!');

      const {
        temperature: temp,
        precipProbability: precip
      } = response.body.currently;
      const { summary } = response.body.daily.data[0];

      return callback(
        undefined,
        `${summary} It is currently ${temp} degrees celsius out there. There is a ${precip}% chance of rain.`
      );
    }
  );
};

module.exports = forecast;

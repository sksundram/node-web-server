const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup partials  path for hbs
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Shailesh Kumar Sundram'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Shailesh Kumar Sundram'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Shailesh Kumar Sundram'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found!',
    title: '404',
    name: 'Shailesh Kumar Sundram'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) return res.send({ error: 'You must provide an address!' });

  geocode(address, (error, geocodeData) => {
    if (error) return res.send({ error });

    const { lat, long, location } = geocodeData;
    forecast(lat, long, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({ forecast: forecastData, location, address });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found!',
    title: '404',
    name: 'Shailesh Kumar Sundram'
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

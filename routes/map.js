const keys = require('../config/keys');
const axios = require('axios');
const maps = require('../services/maps');

module.exports = app => {
  const mapId = keys.MAP_ID;
  const mapCode = keys.MAP_CODE;

  app.get('/api/geocode', async (req, res) => {
    const geocode = await maps.geocoder(`${req.user.streetAddress}+${req.user.city}+${req.user.state}`);
    res.json(geocode);
  })

}
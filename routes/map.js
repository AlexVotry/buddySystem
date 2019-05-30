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

  // app.get('/api/isoline', async (req, res) => {
  //   const options = req.query;

  //   const isoline = [];
  //   const hereIsoline = await maps.mapIsolineUrl(req.query);
  //   if (hereIsoline.response.isoline[0].component.length > 0) {
  //     isoline = hereIsoline.response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
  //   } 
  //   console.log('isoline: ', isoline);
  //   res.json(isoline);
  // })

  app.get('/api/mapUrl', (req, res) => {
    const style = req.query.style;
    console.log('style', style);

    const response = maps.mapTileUrl(style);
    res.send(response);
  })
  
}


const keys = require('../config/keys');
const axios = require('axios');

const mapId = keys.MAP_ID;
const mapCode = keys.MAP_CODE;

module.exports = {
  geocoder: async address => {
     //TODO: put in a catch for bad data:
    const geocode = await axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${mapId}&app_code=${mapCode}&searchtext=${address}`);
    const latAndLong = await geocode.data.Response.View[0].Result[0].Location.DisplayPosition;

    return latAndLong;
  },

  mapIsolineUrl: async options => {
    const isoline = await axios.get(`https://isoline.route.api.here.com/routing/7.2/calculateisoline.json
      ?app_id=${mapId}
      &app_code=${mapCode}
      &mode=shortest;${options.mode};
      traffic:${options.traffic ? 'enabled' : 'disabled'}
      &start=geo!${options.center[0]},${options.center[1]}
      &range=${options.range}
      &rangetype=${options.type}`);

    return isoline;
  },

  mapTileUrl: async style => {
    const map = await axios.get(`https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/13/4400/2686/512/png8?app_id=${mapId}&app_code=${mapCode}&ppi=320`);

    return map;
  },

  maxIsolineRangeLookup: {
    time: 20000,
    distance: 500000
  }

}
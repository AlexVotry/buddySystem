import axios from 'axios';

const hereCredentials = {
  id: 'cSatqQHw4TUcK8RNBjQI',
  code: 'DvPWunZy9FXUilV4LDHrpA'
}

const hereIsolineUrl = (options) =>
  `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json
?app_id=${hereCredentials.id}
&app_code=${hereCredentials.code}
&mode=shortest;${options.mode};
traffic:${options.traffic ? 'enabled' : 'disabled'}
&start=geo!${options.center[0]},${options.center[1]}
&range=${options.range}
&rangetype=${options.type}`

const hereTileUrl = async (style) => {
  return await axios.get('/api/map', { params: style });
};

const maxIsolineRangeLookup = {
  time: 20000,
  distance: 500000
}

export {
  hereCredentials,
  hereIsolineUrl,
  hereTileUrl,
  maxIsolineRangeLookup
}

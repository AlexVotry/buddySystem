import L from 'leaflet';

const hereCredentials = {
  id: 'cSatqQHw4TUcK8RNBjQI',
  code: 'DvPWunZy9FXUilV4LDHrpA'
}

const hereIsolineUrl = (options) => {
  console.log('options:', options.center[0]);
return `https://isoline.route.api.here.com/routing/7.2/calculateisoline.json
?app_id=${hereCredentials.id}
&app_code=${hereCredentials.code}
&mode=shortest;${options.mode};
traffic:${options.traffic ? 'enabled' : 'disabled'}
&start=geo!${options.center[0]},${options.center[1]}
&range=${options.range}
&rangetype=${options.type}`
}

const hereTileUrl = (style) => `https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?app_id=${hereCredentials.id}&app_code=${hereCredentials.code}&ppi=320`;

const maxIsolineRangeLookup = {
  time: 6000,
  distance: 250000
}

const greenMarker = L.icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export {
  greenMarker,
  hereCredentials,
  hereIsolineUrl,
  hereTileUrl,
  maxIsolineRangeLookup
}

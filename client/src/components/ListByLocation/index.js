import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';

const ListByLocation = () => {
  const marker = React.createRef();
  const map = React.createRef();

  const [options, setOptions] = useState(
    {
      color: '#5DDCCF',
      shape: [],
      center: [47.605779, -122.315744],
      mode: 'car',
      range: 1000,
      type: 'time',
      traffic: false,
      zoom: 12
    });

  // const updateIsoline = async () => {
  //   console.log('iso: ', options.color);
  //   const res = await axios.get('/api/isoline', { params: options });
  //   console.log('res:', res.data);
  // }

  // const fetchMap = async () => {
  //   const geocode = await axios.get('/api/map');
  //   console.log('geo:', geocode.data);
  // }

  useEffect(() => {
    // updateIsoline();
  }, []);


  return (
    <div>
      <div>List by Location</div>
      <MapContainer
        color={options.color}
        isoline={options.shape}
        center={options.center}
        zoom={options.zoom}
        // handleMapMove={this.handleMapMove}
        // handleMarkerDrag={this.handleMarkerDrag}
      />
    </div>
  )
}

export default ListByLocation;
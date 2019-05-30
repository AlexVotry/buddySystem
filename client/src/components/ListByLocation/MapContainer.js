import React from 'react';
import { Map, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import { hereTileUrl } from './here';
import axios from 'axios';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.marker = React.createRef();
    this.map = React.createRef();

    this.state = { url: '', style: 'reduced.night'};
  }

  handleMapMove = () => {
    const zoom = this.map.current.viewport.zoom;
    this.props.handleMapMove(zoom);
  }


  handleMarkerDrag = () => {
    const coordinates = this.marker.current.leafletElement.getLatLng();
    const center = [coordinates.lat, coordinates.lng];
    this.props.handleMarkerDrag(center);
  }

  render() {
    const position = this.props.center;
    return (
      <Map center={position} zoom={this.props.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.here.com/">here.com</a> contributors'
          url={hereTileUrl('reduced.night')}
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polygon
          fillOpacity={0.1}
          weight={2}
          positions={this.props.isoline}
          color={this.props.color}
        />
      </Map>
    );
  }
}

export default MapContainer;
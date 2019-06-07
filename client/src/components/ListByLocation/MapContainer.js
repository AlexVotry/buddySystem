import React from 'react';
import { Map, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import { hereTileUrl, greenMarker } from './here';
import {Link} from 'react-router-dom';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.marker = React.createRef();
    this.map = React.createRef();
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

  renderMarkers = () => {

    return this.props.events.map(event => {
      return (
        <Marker position={[event.lat, event.long]} key={event._id} ref={this.marker}>
          <Popup>
            <Link to={`event/${event._id}`}>{event.title}</Link> <br /> 
            <Link to={event.url}>event.url</Link>.
          </Popup>
        </Marker>
      )
    })
  }
  
  render() {
    console.log('events:', this.props.events);
    const position = this.props.center;
    return (
      <Map center={position} zoom={this.props.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.here.com/">here.com</a> contributors'
          url={hereTileUrl('reduced.night')}
        />
        <Marker position={position} icon={greenMarker}>
          <Popup>
            Your Home.
          </Popup>
        </Marker>
        {this.renderMarkers()} 
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
import React from 'react';
import { Map, TileLayer, Marker, Polygon } from 'react-leaflet';
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

  getUrl = async () => {
    const url = await axios.get('/api/mapUrl', { params: this.state });
    console.log('url: ', url.data);
    this.setState({url: url.data});
  }

  componentDidMount = async () => {
    this.getUrl('reduced.night');
  }

  render() {
    return (
      <div className="map">
        <Map
          center={this.props.center}
          zoom={this.props.zoom}
          zoomControl={false}
          attributionControl={false}
          onMoveend={this.handleMapMove}
          ref={this.map}
        >
          <TileLayer
            url={this.state.url}
          />
          <Marker
            position={this.props.center}
            draggable={true}
            onDragEnd={this.handleMarkerDrag}
            ref={this.marker}
          />
          <Polygon
            fillOpacity={0.1}
            weight={2}
            positions={this.props.isoline}
            color={this.props.color}
          />
        </Map>
      </div>
    )
  }

}
export default MapContainer;
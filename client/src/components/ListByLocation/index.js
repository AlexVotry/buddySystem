import React from 'react';
import { connect } from 'react-redux'
import { hereIsolineUrl, maxIsolineRangeLookup } from './here';
import { categories } from '../Forms/checkboxInfo';
import './map.css';

import { fetchUser } from '../../actions';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';
import axios from 'axios';

class ListByLocation extends React.Component {

  // constructor(props) {
  //   super(props);

  // this.marker = React.createRef();
  // this.map = React.createRef();

  state = {
    color: '#5DDCCF',
    shape: [],
    center: [],
    mode: 'car',
    range: 1000,
    type: 'time',
    traffic: false,
    zoom: 12,
    counter: 0,
    events: []
  };
  // }

  componentDidMount = async () => {
    await this.props.fetchUser();
    if (this.props.auth) {
      this.setState({ center: [this.props.auth.lat, this.props.auth.long] });
      this.updateIsoline();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.auth !== this.props.auth) {
      this.setState({ center: [this.props.auth.lat, this.props.auth.long] });
    }
    if (this.state.counter < 1) {
      this.updateIsoline();
    }
  }

  updateIsoline = async () => {
    if (this.state.center.length > 0) {
      const counter = this.state.counter + 1;
      this.setState({ counter });
      let shape = [];
      const res = await axios.get(hereIsolineUrl(this.state));
      if (res.data.response.isoline[0].component.length > 0) {
        shape = res.data.response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
      }
      this.setState({ shape })
    }
  }

  fetchEvents = async (q) => {
    const query = q;
    const res = await axios.get(`/api/eventsByCategory/${query}`);
    this.setState({ events: res.data });
    window.localStorage.setItem('defaultCategory', query);
  };

  onClick = (e) => {
    this.fetchEvents(e)
  }

  handleMapMove = (zoom) => this.setState({ zoom });

  handleMarkerDrag = (center) => this.setState({ center }, () => this.updateIsoline());

  updateOptions = (value, cat) => {
    if (cat === 'type' && this.state.range > maxIsolineRangeLookup[value]) {
      this.setState({ range: maxIsolineRangeLookup[value] });
    }
    this.setState({ [cat]: value }, () => this.updateIsoline());
  }

  updateRange = e => {
    let range = e.target.value;
    this.setState({ range }, () => this.updateIsoline());
  }

  render() {
    if (this.state.center.length === 0) {
      return <div>loading...</div>;
    }
    const max = this.state.type === 'distance' ?
      maxIsolineRangeLookup.distance :
      maxIsolineRangeLookup.time;
    const sliderVal = this.state.range > max ? max : this.state.range;
    return (
      <div className="app">
        <div>
          <Sidebar
            updateOptions={this.updateOptions}
            updateRange={this.updateRange}
            max={max}
            sliderVal={sliderVal}
            options={this.state}
            categories={categories}
            onClick={this.onClick}
          />
          <MapContainer
            color={this.state.color}
            isoline={this.state.shape}
            center={this.state.center}
            zoom={this.state.zoom}
            handleMapMove={this.handleMapMove}
            handleMarkerDrag={this.handleMarkerDrag}
            events={this.state.events}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(ListByLocation);

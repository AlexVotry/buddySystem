import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { categories } from '../Forms/checkboxInfo';
import Dropdown from '../Dropdown';

class ListByCat extends React.Component {
  state = { events: [] };

  componentDidMount = () => {
    const userCategory = this.props.auth ? this.props.auth.categories[0] : 'watching sports';
    const q = window.localStorage.getItem('defaultCategory') || userCategory;
    this.fetchEvents(q);
  }

  fetchEvents = async (q) => {
    const query = q;
    const res = await axios.get(`/api/eventsByCategory/${query}`);
    console.log('events:', res.data);
    this.setState({events: res.data});
    window.localStorage.setItem('defaultCategory', query);
  };

  onClick = (e) => {
    this.fetchEvents(e)
  }

  renderEvents = () => {
    return this.state.events.map(event => {
      let date = moment(event.date).format('MM-DD-YYYY');
      return (
        <div key={event._id} className="list-group">
          <Link to={`/event/${event._id}`} className="list-group-item list-group-item-action">
          <h2>{event.title}</h2>
          <p>{date} <span>{event.category}</span><span>{event.cost}</span></p>
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        {/* {this.renderDropdown()} */}
        <Dropdown items={categories} title="Categories" onClick={this.onClick} />
        {this.renderEvents()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {auth};
}

export default connect(mapStateToProps)(ListByCat);

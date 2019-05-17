import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { categories } from '../Forms/checkboxInfo';

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
    this.setState({events: res.data});
    window.localStorage.setItem('defaultCategory', query);
  };
  
  onClick = (e) => {
    console.log(e);
    console.log(this.props.auth);
    this.fetchEvents(e)

  }

  renderDropdown = () => {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle"  id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {this.renderCategories()}
        </div>
      </div>
    )
  }

  renderCategories = () => {
    return categories.map(category => {
      return <button className="dropdown-item" key={category} onClick={() => this.onClick(category)}>{category}</button>
    })
  }

  renderEvents = () => {
    return this.state.events.map(event => {
      let date = moment(event.date).format('MM-DD-YYYY');
      return (
        <div key={event._id} className="list-group">
          <Link to={`/detail/${event._id}`} className="list-group-item list-group-item-action">
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
        {this.renderDropdown()}
        {this.renderEvents()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {auth};
}
    
export default connect(mapStateToProps)(ListByCat);
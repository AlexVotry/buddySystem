import React from 'react';
import axios from 'axios';
import Groups from '../Groups';
import PostGroups from '../PostGroups';

class EventDetail extends React.Component {
  state = { event: {}};

  componentDidMount() {
    this.fetchEventWithGroups(this.props.match.params.id);
  }

  fetchEventWithGroups = async (id) => {
    const res = await axios.get(`/api/event/${id}`);
    this.setState({event: res.data });
  }

  render() {
    const event = this.state.event;
    console.log('event:', event.groups);
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h2>{event.title}</h2>
          <div>{event.url}</div>
          <div>{event.cost}</div>
        </div>
        <Groups eventGroups={event.groups} />
        <PostGroups eventId={event._id} />
      </React.Fragment>
    )
  }

}

export default EventDetail;
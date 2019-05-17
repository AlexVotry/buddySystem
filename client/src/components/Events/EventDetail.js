import React, {Suspense, Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Groups from '../Groups';
import PostGroups from '../Groups/PostGroups';

// class EventDetail extends React.Component {
  const EventDetail = props => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    fetchEventWithGroups(props.match.params.id);
  }, []);
  // state = { event: {}};

  // componentDidMount() {
  //   this.fetchEventWithGroups(this.props.match.params.id);
  // }

  const fetchEventWithGroups = async (id) => {
    const res = await axios.get(`/api/event/${id}`);
    // this.setState({event: res.data });
    setEvent(res.data);
  }
  console.log('eventId eventDetail:', event._id);
  // render() {
    // const event = this.state.event;
    return (
      <Fragment>
        <div className="jumbotron">
          <h2>{event.title}</h2>
          <div>{event.url}</div>
          <div>{event.cost}</div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Groups eventGroups={event.groups} />
          <PostGroups />
        </Suspense>
      </Fragment>
    )
  // }

}

export default EventDetail;


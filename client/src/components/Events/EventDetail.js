import React, {Suspense, Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Groups from '../Groups';
import PostGroups from '../Groups/PostGroups';

const EventDetail = props => {
  const [event, setEvent] = useState({});
  const eventId = props.match.params.id;

  useEffect(() => {
    fetchEventWithGroups(eventId);
    window.localStorage.setItem('eventId', eventId)
  }, []);

  const fetchEventWithGroups = async (id) => {
    const res = await axios.get(`/api/event/${id}`);
    setEvent(res.data);
  }
  return (
    <Fragment>
      <div className="jumbotron">
        <h2>{event.title}</h2>
        <div>{event.url}</div>
        <div>{event.cost}</div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Groups eventGroups={event.groups} />
        <PostGroups eventId={eventId}/>
      </Suspense>
    </Fragment>
  )

}

export default EventDetail;

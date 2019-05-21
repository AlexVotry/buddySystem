import React, {Suspense, Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Groups from '../Groups';
import PostGroups from '../Groups/PostGroups';

const EventDetail = props => {
  const [event, setEvent] = useState({});
  const [joined, setJoined] = useState(false);
  const eventId = props.match.params.id;

  useEffect(() => {
    fetchEventWithGroups(eventId);
    initialCheckForGroup();
    window.localStorage.setItem('eventId', eventId)
  }, []);

  const fetchEventWithGroups = async (id) => {
    const res = await axios.get(`/api/event/${id}`);
    setEvent(res.data);
  }

  const initialCheckForGroup = async () => {
    const res = await axios.get(`/api/checkForGroup/${eventId}`);
    setJoined(res.data);
  }

  const checkIfBelongToGroup = (update) => {
    setJoined(update);
  }

  return (
    <Fragment>
      <div className="jumbotron">
        <h2>{event.title}</h2>
        <div>{event.url}</div>
        <div>{event.cost}</div>
      </div>
        <Groups doTheCheck={checkIfBelongToGroup} eventId={eventId} eventGroups={event.groups} />
        <PostGroups joined={joined} eventId={eventId}/>
    </Fragment>
  )

}

export default EventDetail;

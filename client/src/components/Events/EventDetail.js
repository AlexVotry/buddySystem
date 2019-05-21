import React, {Suspense, Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Groups from '../Groups';
import PostGroups from '../Groups/PostGroups';

const EventDetail = props => {
  const [event, setEvent] = useState({});
  const [joined, setJoined] = useState(false);
  const [updated, setUpdated] = useState(false);
  const eventId = props.match.params.id;

  useEffect(() => {
    fetchEventWithGroups(joined);
    initialCheckForGroup();
    window.localStorage.setItem('eventId', eventId)
  }, []);

  const fetchEventWithGroups = async (bool) => {
    const res = await axios.get(`/api/event/${eventId}`);
    setEvent(res.data);
    setJoined(bool);
  }

  const initialCheckForGroup = async () => {
    const res = await axios.get(`/api/checkForGroup/${eventId}`);
    setJoined(res.data);
  }

  const checkIfBelongToGroup = async (update) => {
    await setJoined(update);
  }

  return (
    <Fragment>
      <div className="jumbotron">
        <h2>{event.title}</h2>
        <div>{event.url}</div>
        <div>{event.cost}</div>
      </div>
        <Groups fetch={fetchEventWithGroups} joined={joined} eventId={eventId} doTheCheck={checkIfBelongToGroup}  eventGroups={event.groups} />
        <PostGroups fetch={fetchEventWithGroups} joined={joined} eventId={eventId} doTheCheck={checkIfBelongToGroup}/>
    </Fragment>
  )

}

export default EventDetail;

import React, {Fragment, useState, useEffect} from 'react';
import ShowUserNames from '../ShowUserNames';
import axios from 'axios';

const GroupDetail = (props) => {
  const [group, setGroup] = useState(props.group);
  const [joined, setJoined] = useState(true);

  const joinGroup = async (id) => {
    const res = await axios.post(`/api/adduser/${id}`);
    setGroup(res.data);
    setJoined(true);
  }

  const quitGroup = async (id) => {
    const res = await axios.post(`/api/removeuser/${id}`);
    setGroup(res.data);
    setJoined(false);
  }

  const checkIfBelongToGroup = async () => {
    const res = await axios.get(`/api/checkForGroup/${props.eventId}`);
    setJoined(res.data);
  }

  useEffect(() => {
    checkIfBelongToGroup();
  }, [])

  useEffect(() => {
    props.doTheCheck(joined);
  }, [joined])

  const renderGroup = () => {
    return (
      <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>
        <div className="card-header">age range from: {group.ageMin} to {group.ageMax}</div>
        <div className="card-body">
          <p>Prefered gender: {group.gender.map( g => <span key={g}>{g}, </span>)}</p>
          <p>Maximum friends: {group.max}</p>
          <ShowUserNames users={group.users} />
          <button className="btn btn-light" disabled={joined} onClick={() => {joinGroup(group._id)}}>join group</button>
          <button className="btn btn-danger"onClick={() => {quitGroup(group._id)}}>quit group</button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {renderGroup()}
    </Fragment>
  )
}

export default GroupDetail;

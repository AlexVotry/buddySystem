import React, {Fragment, useState} from 'react';
import ShowUserNames from '../ShowUserNames';
import axios from 'axios';

const GroupDetail = (props) => {
  const [group, setGroup] = useState(props.group);

  const joinGroup = async (id) => {
    const res = await axios.post(`/api/adduser/${id}`);
    console.log('joindata:', res.data);
    setGroup(res.data);
  }

  const quitGroup = async (id) => {
    const res = await axios.post(`/api/removeuser/${id}`);
    console.log('quitdata:', res.data);
    setGroup(res.data);
  }

  const renderGroup = () => {
    return (
      <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}}>
        <div className="card-header">age range from: {group.ageMin} to {group.ageMax}</div>
        <div className="card-body">
          <p>Prefered gender: {group.gender.map( g => <span key={g}>{g}, </span>)}</p>
          <p>Maximum friends: {group.max}</p>
          <ShowUserNames users={group.users} />
          <button className="btn btn-light" onClick={() => {joinGroup(group._id)}}>join group</button>
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

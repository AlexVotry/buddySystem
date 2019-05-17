import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowUserNames = props => {
  const [userNames, setUserNames] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(`/api/usernames/${props.groupId}`);
    console.log('users:', res.data);
    setUserNames(res.data);
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  const renderUserNames = () => {
    return userNames.map(name => {
      return <div key={name._id}>{name.userName}</div>
    })
  }

  return (
    <div>Going: {renderUserNames()}</div>
  )
}

export default ShowUserNames;
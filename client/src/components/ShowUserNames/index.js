import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowUserNames = props => {
  console.log('props;', props);
  const [userNames, setUserNames] = useState([]);

  const getUsers = async () => {
    console.log('response help');
    const res = await axios.get(`/api/usernames/${props.groupId}`);
    setUserNames(res.data);
    console.log('response:', res.data);
  }
  
  useEffect(() => {
    console.log('usereffect')
    getUsers();
  }, []);

  const renderUserNames = () => {
    return userNames.map(name => {
      return <div key={name._id}>{name.userName}</div>
    })
  }

  return (
    <div>{renderUserNames()}</div>
  )
}

export default ShowUserNames;
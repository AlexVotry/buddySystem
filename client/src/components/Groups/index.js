import React from 'react';
import ShowUserNames from '../ShowUserNames';

const Groups = props => {
  
  const renderGroups = () => {
    const groups = props.eventGroups;
    if (!groups) return null;
    return groups.map(group => {
      return (
        <div className="card text-white bg-info mb-3" style={{maxWidth: '18rem'}} key={group._id}>
          <div className="card-header">age range from: {group.ageMin} to {group.ageMax}</div>
          <div className="card-body">
            <p>Prefered gender: {group.gender.map( g => <span key={g}>{g}, </span>)}</p>
            <p>Maximum friends: {group.max}</p>
            <ShowUserNames groupId={group._id} />
            <button className="btn btn-light">join group</button>
            <button className="btn btn-danger">quit group</button>
          </div>
        </div>

      )
    })
  }

  return (
    <div className="row">
      {renderGroups()}
    </div>
  )
}

export default Groups;
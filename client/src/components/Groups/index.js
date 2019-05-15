import React from 'react';
import ShowUserNames from '../ShowUserNames';

const Groups = props => {
  const groups = props.eventGroups;

  const renderGroups = () => {
    if (!groups) return null;
    return groups.map(group => {
      return (
        <div key={group._id}>
          <div>age range from: {group.ageMin} to {group.ageMax}</div>
          <p>Prefered gender: {group.gender.map( g => <span key={g}>{g}, </span>)}</p>
          <p>Maximum friends: {group.max}</p>
          <ShowUserNames groupId={group._id} />
        </div>

      )
    })
  }

    return (
      <div>
        {renderGroups()}
      </div>
    )
}

export default Groups;
import React from 'react';
import GroupDetail from './GroupDetail';

const Groups = props => {

  const renderGroups = () => {
    const groups = props.eventGroups;
    if (!groups) return null;
    return groups.map(group => {
      return (
        <GroupDetail group={group} key={group._id}/>
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

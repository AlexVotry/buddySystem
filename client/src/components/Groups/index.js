import React from 'react';
import GroupDetail from './GroupDetail';

const Groups = props => {

  const renderGroups = () => {
    if (!props.eventGroups) return null;
    return props.eventGroups.map(group => {
      return (
        <GroupDetail joined={props.joined} fetch={props.fetch} doTheCheck={props.doTheCheck} eventId={props.eventId} group={group} key={group._id}/>
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

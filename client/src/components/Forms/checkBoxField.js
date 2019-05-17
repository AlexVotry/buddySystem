import React from 'react';
import {checkBoxGroup} from './checkBoxGroup';

export default ({ input, label, checkBoxes, meta: { error, touched } }) => {

  return (
    <React.Fragment>
      <h6>{label}</h6>
      {checkBoxGroup(checkBoxes, input)}
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </React.Fragment>
  )
}
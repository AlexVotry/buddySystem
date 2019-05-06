import React from 'react';
import { activities } from './seedDate';

export default ({ input, label, meta: { error, touched } }) => {

  const checkboxGroup = () => {

    return activities.map((activity, index) => {
      return (
        <div className="form-check form-check-inline" key={activity}>
          <input className="form-check-input"
            type="checkbox"
            name={`${input.name}[${index}]`}
            value={activity}
            checked={input.value.indexOf(activity) !== -1}
            onChange={(event) => {
              const newValue = [...input.value];
              if (event.target.checked) {
                newValue.push(activity);
              } else {
                newValue.splice(newValue.indexOf(activity), 1);
              }

              return input.onChange(newValue);
            }} />
          <label className="form-check-label" htmlFor={activity}>{activity}</label>
        </div>)
    });
  }

  return (
    <React.Fragment>
      <h6>{label}</h6>
      {checkboxGroup()}
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </React.Fragment>
  )
}
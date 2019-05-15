import React from 'react';

export default ({ input, label, checkBoxes, meta: { error, touched } }) => {

  const checkboxGroup = () => {

    return checkBoxes.map((checkbox, index) => {
      return (
        <div className="form-check form-check-inline" key={checkbox}>
          <input className="form-check-input"
            type="checkbox"
            name={`${input.name}[${index}]`}
            value={checkbox}
            checked={input.value.indexOf(checkbox) !== -1}
            onChange={(event) => {
              const newValue = [...input.value];
              if (event.target.checked) {
                newValue.push(checkbox);
              } else {
                newValue.splice(newValue.indexOf(checkbox), 1);
              }

              return input.onChange(newValue);
            }} />
          <label className="form-check-label" htmlFor={checkbox}>{checkbox}</label>
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
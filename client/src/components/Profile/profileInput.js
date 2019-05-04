import React from 'react';

// ({ input }) == (props.input)
export default ({ input, label, meta: { error, touched } }) => {
  // {...input} == all the properties on input object
  // {touched && error} == if (touched && error) { error }
  return (
    <div>
      <label>{label}</label>
      <input {...input} type="text" style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}
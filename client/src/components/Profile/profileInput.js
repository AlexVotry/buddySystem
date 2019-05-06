import React from 'react';

// ({ input }) == (props.input)
export default ({ input, label, meta: { error, touched } }) => {
  // {...input} == all the properties on input object
  // {touched && error} == if (touched && error) { error }
  return (
    <React.Fragment>
      <label>{label}</label>
      <input {...input} className="form-control" type="text" style={{ marginBottom: '5px' }} />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </React.Fragment>
  )
}


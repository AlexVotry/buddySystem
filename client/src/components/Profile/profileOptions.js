import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <select {...input} component="select" style={{ marginBottom: '5px' }} >
        <option />
        <option value="tennis">tennis</option>
        <option value="comedy">comedy</option>
        <option value="nightclub">nightclubs</option>
        <option value="trivia">trivia</option>
      </select>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}
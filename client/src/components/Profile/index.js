import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import profileInput from './profileInput';
import profileOptions from './profileOptions';
import { fields } from './formFields';
import { submitProfile } from '../../actions';
import UploadImage from './UploadImage';

class Profile extends Component {

  renderField(field, input) {
    return _.map(fields[input], ({ label, name }) => {
      return (
        <Field key={name} component={field} label={label} name={name}/>
      );
    });
  };

  onSubmit = (formValues, history) => {
    formValues.image = this.props.image;
    this.props.submitProfile(formValues, history);
  }

  render() {
    console.log('state: ', this.state);
    const { handleSubmit } = this.props;
    return (
      <div>
        <UploadImage />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderField(profileInput, 'text')}
          {this.renderField(profileOptions, 'select')}
          <Link to="/" className="red btn">Cancel</Link>
          <button className="teal btn" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  console.log('validate:', values);
  
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

const mapStateToProps =({ image }) => {
  return { image };
}

Profile = connect(mapStateToProps, {submitProfile})(withRouter(Profile));

export default reduxForm({
  validate,
  form: 'profileForm'
})(Profile);

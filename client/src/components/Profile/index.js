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
    // if (this.props.profile) {
    //   console.log('input:', this.props.profile['age'])
    // }
    return _.map(fields[input], ({ label, name }) => {
      return (
        <Field className="field" key={name} component={field} label={label} name={name}/>
      );
    });
  };

  onSubmit = (formValues, history) => {
    formValues.image = this.props.image.id;
    console.log('formValues', formValues);
    this.props.submitProfile(formValues, history);
  }

  render() {
    // console.log('state: ', this.props);
    // console.log('profile: ', this.props.auth);
    const { handleSubmit } = this.props;
    return (
      <div>
        <UploadImage />
        <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderField(profileInput, 'text')}
          {this.renderField(profileOptions, 'select')}
          <Link to="/" className="btn btn-danger">Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  // console.log('validate:', values);
  
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

const mapStateToProps = state => {
  return { image: state.image, profile: state.auth };
}

Profile = connect(mapStateToProps, {submitProfile})(withRouter(Profile));

export default reduxForm({
  validate,
  form: 'profileForm'
})(Profile);

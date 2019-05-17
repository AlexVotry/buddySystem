import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { map, each }from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import inputGroup from '../Forms/inputGroup';
import checkBoxField from '../Forms/checkBoxField';
import { fields } from './formFields';
import { submitProfile } from '../../actions';
import UploadImage from '../Forms/UploadImage';
import { categories } from '../Forms/checkboxInfo';


class Profile extends Component {
  state = { redirect: false };

  renderField(field, input) {
    return map(fields[input], ({ label, name, subscript }) => {
      return (
        <Field 
          className="field" 
          key={name} component={field} 
          label={label} 
          name={name} 
          checkBoxes={categories}
          subscript={subscript}
        />
      );
    });
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  onSubmit = (formValues) => {
    formValues.image = this.props.image.id;
    this.props.submitProfile(formValues);
    this.setRedirect();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
        <UploadImage />
        {this.renderRedirect()}
        <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderField(inputGroup, 'text')}
          {this.renderField(checkBoxField, 'select')}
          <Link to="/" className="btn btn-danger">Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  each(fields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
}

const mapStateToProps = state => {
  return { image: state.image, profile: state.auth };
}

Profile = connect(mapStateToProps, {submitProfile})(Profile);

export default reduxForm({
  validate,
  form: 'profileForm'
})(Profile);

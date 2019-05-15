import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { fields } from './formFields';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { submitEvents } from '../../actions';
import profileInput from '../Forms/profileInput';
import profileOptions from '../Forms/profileOptions';
import { activities } from '../Forms/checkboxInfo';

class PostEvents extends React.Component {
  state = { redirect: false };

  renderField(field, input) {
    return map(fields[input], ({ label, name, subscript }) => {
      return (
        <Field
          className="field"
          key={name} component={field}
          label={label}
          name={name}
          checkBoxes={activities}
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
      return <Redirect to={'/event'}/>
    }
  }

  onSubmit = (formValues) => {
    this.props.submitEvents(formValues);
    window.localStorage.setItem('formValues', JSON.stringify(formValues));
    this.setRedirect();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
      { this.renderRedirect() }
      <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderField(profileInput, 'text')}
        {this.renderField(profileOptions, 'select')}
        <Link to="/" className="btn btn-danger">Cancel</Link>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      </React.Fragment>
    )
  }
}

PostEvents = connect(null, {submitEvents})(PostEvents);

export default reduxForm({
  form: 'eventForm',
  destroyOnUnmount: false
})(PostEvents);

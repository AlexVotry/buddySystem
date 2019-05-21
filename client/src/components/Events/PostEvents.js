import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { fields } from './formFields';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { submitEvent } from '../../actions';
import inputGroup from '../Forms/inputGroup';
import checkBoxGroup from '../Forms/checkBoxGroup';
import { categories } from '../Forms/checkboxInfo';

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
      return <Redirect to={`/detail/${this.props.event._id}`}/>
    }
  }

  onSubmit = async (formValues) => {
    await this.props.submitEvent(formValues);
    window.localStorage.setItem('formValues', JSON.stringify(formValues));
    console.log('response:', this.props.event);
    this.setRedirect();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
      { this.renderRedirect() }
      <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderField(inputGroup, 'text')}
        {this.renderField(checkBoxGroup, 'select')}
        <Link to="/" className="btn btn-danger">Cancel</Link>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  console.log('postEvent state:', state);
  return {event: state.event[0]};
}

PostEvents = connect(mapStateToProps, {submitEvent})(PostEvents);

export default reduxForm({
  form: 'eventForm',
  destroyOnUnmount: false
})(PostEvents);

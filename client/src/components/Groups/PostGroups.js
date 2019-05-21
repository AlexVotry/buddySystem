import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import inputGroup from '../Forms/inputGroup';
import checkBoxGroup from '../Forms/checkBoxGroup';
import { fields } from './formFields';
import { submitGroup } from '../../actions';
import { gender } from '../Forms/checkboxInfo';
import axios from 'axios';

class PostGroups extends React.Component {

  renderForm() {
    if (this.props.joined) return null;
    const { handleSubmit } = this.props;
    return (
      <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
        {this.renderField(inputGroup, 'text')}
        {this.renderField(checkBoxGroup, 'select')}
        <Link to="/" className="btn btn-danger">Cancel</Link>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    )
  }

  renderField(field, input) {
    return map(fields[input], ({ label, name, subscript }) => {
      return (
        <Field
          className="field"
          key={name} component={field}
          label={label}
          name={name}
          checkBoxes={gender}
          subscript={subscript}
        />
      );
    });
  };

  onSubmit = (formValues) => {
    formValues.users = [this.props.user._id];
    formValues.event = this.props.eventId;
    this.props.submitGroup(formValues, this.props.user._id);
  }

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
}

PostGroups = connect(mapStateToProps, { submitGroup })(PostGroups);

export default reduxForm({
  form: 'groupForm'
})(PostGroups);

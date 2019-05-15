import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import profileInput from '../Forms/profileInput';
import profileOptions from '../Forms/profileOptions';
import { fields } from './formFields';
import { submitGroup } from '../../actions';
import { gender } from '../Forms/checkboxInfo';

class PostGroups extends React.Component {
  state = { redirect: false };
  
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

  setRedirect = () => {
    this.setState({ redirect: true });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/detail/${this.props.eventId}`} />
    }
  }

  onSubmit = (formValues) => {
    formValues.users = [this.props.user._id];
    formValues.event = this.props.eventId;
    this.props.submitGroup(formValues, this.props.user._id);
    this.setRedirect();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <React.Fragment>
        {this.renderRedirect()}
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

const mapStateToProps = state => {
  return { user: state.auth };
}

PostGroups = connect(mapStateToProps, { submitGroup })(PostGroups);

export default reduxForm({
  form: 'groupForm'
})(PostGroups);
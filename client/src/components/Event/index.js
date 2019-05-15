import React from 'react';
import { connect } from 'react-redux';
import { fetchOneEvent } from '../../actions';
import PostGroups from '../PostGroups';
import Groups from '../Groups';


class Event extends React.Component {

  renderEventValues () {
    const event = this.props.formEvent;
    return (
      <div className="jumbotron">
        <h2>{event.title}</h2>
        <div>{event.url}</div>
        <div>{event.cost}</div>
      </div>
    );
  }
  
  render () {
    if(!this.props.eventId) return null;
    return (
      <div>
        {this.renderEventValues()}
        <Groups eventId={this.props.eventId} />
        <PostGroups eventId={this.props.eventId} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const eventId = Object.keys(state.event)[0] || window.localStorage.getItem('eventId');
  const formEvent = state.form.eventForm ? state.form.eventForm.values : JSON.parse(window.localStorage.getItem('formValues'));
  
  window.localStorage.setItem('eventId', eventId);

  return { formEvent, eventId };
}

export default connect(mapStateToProps, { fetchOneEvent})(Event);
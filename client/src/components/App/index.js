import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchUser } from '../../actions';
import Header from '../Header';
import Home from '../Home';
import PostEvents from '../PostEvents';
import ListByCat from '../ListByCat';
import ListByDate from '../ListByDate';
import ListByLocation from '../ListByLocation';
import Profile from '../Profile';
import Errors from '../Errors';
import PostGroups from '../PostGroups';
import Event from '../Event';
import EventDetail from '../EventDetail';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header className="App-header" />
            <Route exact path="/" component={Home} />
            <Route exact path="/postEvent" component={PostEvents} />
            <Route exact path="/category" component={ListByCat} />
            <Route exact path="/date" component={ListByDate} />
            <Route exact path="/location" component={ListByLocation} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/postGroups" component={PostGroups} />
            <Route exact path="/error" component={Errors} />
            <Route exact path="/event" component={Event} />
            <Route exact path="/detail/:id" component={EventDetail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);

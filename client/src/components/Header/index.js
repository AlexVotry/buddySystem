import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';


class Header extends Component {
  // this.props.auth is the result from the authReducer
  renderContent() {
    console.log('auth: ', this.props.auth);
    
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className = "collapse navbar-collapse mr-md-3" id = "navbarSupportedContent">
            <a href="/auth/google" className="navbar-text">Login With Google</a>
          </div>
        );
      default:
        return [
          <div key="collapse" className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="item" key="profile"><Link to={'/profile'}>Profile</Link></li>
              <li className="item" key="postEvent"><Link to={'/post'}>Post Event</Link></li>
              <li className="item" key="listCat"><Link to={'/category'}>List by Category</Link></li>
              <li className="item" key="listDate"><Link to={'/date'}>List by Date</Link></li>
              <li className="item" key="listLoc"><Link to={'/location'}>List by location</Link></li>
            </ul>
            <Image cloudName="aleximages" publicId={this.props.auth.image} style={{marginRight: '10px', borderRadius: '50%'}}>
              <Transformation crop="pad" width="40" height="40" radius="50" />
            </Image>
            <a href="/api/logout" className=".mr-md-3 navbar-text">Logout</a>
          </div>
        ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd', marginBottom: '20px'}} data-test="header-component">
        <Link to={"/"} className="navbar-brand" >BudySystem</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        { this.renderContent()}
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
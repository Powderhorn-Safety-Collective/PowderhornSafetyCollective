import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class MemberPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1>FOR THE NAV BAR</h1>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>

        <h1> FOR THE INCIDENT COMPONENT</h1>
        <h1>WILL INCLUDE # of members out on patrol</h1>
        <h1>WILL INCLUDE # of members out on call</h1>
        

        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MemberPage);

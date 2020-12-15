import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
          
        <button onClick= {() => this.props.history.push(`/history`)}>Incident History Page</button>
        <button>Edit Users</button>
        <button>Community Page</button>

        <h1 id="welcome">Welcome ADMIN, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>

        <h1> FOR THE INCIDENT COMPONENT
            WILL ALSO NEED BUTTONS N SUCH
        </h1>
        <h1>Members on patrol: </h1>
        <h1>Members on call: </h1>
        

        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);

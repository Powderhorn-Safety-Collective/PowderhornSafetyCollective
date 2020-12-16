import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatrolItem from '../PatrolItem/PatrolItem.js';
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
        <h1> FOR THE INCIDENT COMPONENT
        </h1>
        <h2>Members on patrol: </h2>
        <ul>  
          {this.props.store.patrolReducer.map((patroller) => {
            return <PatrolItem patroller={patroller}/>
          })}
        </ul>
        <h2>Members on call: </h2>
        

        {/* <LogOutButton className="log-in" /> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);

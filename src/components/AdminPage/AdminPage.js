import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatrolItem from '../PatrolItem/PatrolItem.js';
import OnCallItem from '../OnCallItem/OnCallItem.js';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
          

        <h1 id="welcome">Welcome ADMIN, {this.props.store.user.username}!</h1>
        <h1> FOR THE INCIDENT COMPONENT</h1>
        <div class="onPatrolDisplay">
          <h2>Members on patrol: </h2>
          <ul>  
            {this.props.store.patrolReducer.map((patroller) => {
              return <PatrolItem patroller={patroller}/>
            })}
          </ul>
        </div>
        <div class="onCallDisplay">
          <h2>Members on call: </h2>
            <ul>  
            {this.props.store.onCallReducer.map((onCall) => {
              return <OnCallItem onCall={onCall}/>
            })}
            </ul>
        </div>
        

        {/* <LogOutButton className="log-in" /> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);

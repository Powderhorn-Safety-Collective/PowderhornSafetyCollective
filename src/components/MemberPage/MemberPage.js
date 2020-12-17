import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatrolItem from '../PatrolItem/PatrolItem.js';
import OnCallItem from '../OnCallItem/OnCallItem';
import mapStoreToProps from '../../redux/mapStoreToProps';

class MemberPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome PSC Volunteer, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>

        <h2> FOR THE INCIDENT COMPONENT</h2>
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

        
      </div>
    );
  }
}


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MemberPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import PatrolItem from '../PatrolItem/PatrolItem.js';
import OnCallItem from '../OnCallItem/OnCallItem';
import mapStoreToProps from '../../redux/mapStoreToProps';

// member page will be what PSC members see when they log in
class MemberPage extends Component {

  componentDidMount = () => {
    this.getIncidents();
  }

  // function to fetch all incident data
  getIncidents = () => {
    this.props.dispatch( {type: 'GET_INCIDENTS'});
  }

  render() {
    return ( 
      <div>
        <h1>FOR THE NAV BAR</h1>
        <h1 id="welcome">Welcome PSC Volunteer, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>

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

        <LogOutButton className="log-in" />
      </div>
    );
  }
}


export default connect(mapStoreToProps)(MemberPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatrolItem from '../PatrolItem/PatrolItem.js';
import OnCallItem from '../OnCallItem/OnCallItem.js';
import './Admin.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AdminPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <>
      <div className="row">
        <div className="column">
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        </div>
        <div className="column">
          <div className="box">
            <h1> FOR THE INCIDENT COMPONENT</h1>
          </div>
        </div>
          <div className="column">
            <div className="onPatrolDisplay" className="box scrollable">
              <h2>Members on patrol: </h2>
              {this.props.store.patrolReducer &&
              <ul>  
                {this.props.store.patrolReducer.map((patroller) => {
                  return <PatrolItem patroller={patroller} key={patroller.id}/>
                })}
              </ul>
              }
            </div> 
            <div className="onCallDisplay" className="box scrollable">
              <h2>Members on call: </h2>
              {this.props.store.onCallReducer &&
                <ul>  
                {this.props.store.onCallReducer.map((onCall) => {
                  return <OnCallItem onCall={onCall} key={onCall.id}/>
                })}
                </ul>
              }
            </div>
            </div>
          </div>
        
        {/* <LogOutButton className="log-in" /> */}
    </>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);

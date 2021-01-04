import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import "./Header.css";
import Nav from '../Nav/Nav';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';
import Button from "react-bootstrap/Button";
import mapStoreToProps from '../../redux/mapStoreToProps';


class Header extends Component {

  state = {
    onPatrol: '',
    onCall: ''
  }

  componentDidMount = () => {
    //TO-DO NEED TO CALL THESE DISPATCHES STRATEGICALLY TO ENSURE THEY UPDATE IN REAL TIME
    this.props.dispatch({type: 'FETCH_PATROL'});//get patrol count
    this.props.dispatch({type: 'FETCH_ONCALL'});//get oncall count
    this.props.dispatch({type: 'GET_ACTIVE'}); // dispatch to GET count of all active incidents
    this.props.dispatch( {type: 'GET_PUBLIC_INCIDENTS'});//dispatch to GET all active incidents
  }

  // This function is called whenever either one of the toggles is switched
  // for 'on patrol' or 'on call'
  handleToggle = (event) => {
    // if 'on patrol' is switched from on to off
    if(event.target.name === 'onPatrolToggle' && 
      this.props.store.user.on_patrol == true) {
      console.log('option 1');
      // for this one, we want to only turn off the 'on patrol' boolean
      this.sendPatrolStatus();
    }
    // if 'on call' is switched from on to off
    else if (event.target.name ==='onCallToggle' && 
      this.props.store.user.on_call == true) {
      console.log('option 2');
      // for this one, we want to only turn off the 'on call' boolean
      this.sendCallStatus();
    }
    // if 'on patrol' is switched from off to on
    else if(event.target.name === 'onPatrolToggle' && 
      this.props.store.user.on_patrol == false) {
      if (this.props.store.user.on_call == true) {
        console.log('option 3');
        // want to turn 'on call' off here
        this.sendCallStatus(true);
      }
        console.log('option 4');
        // want to turn 'on patrol' on here
        this.sendPatrolStatus();
    } 
    // if 'on call' is switched from off to on
    else if (event.target.name === 'onCallToggle' && 
      this.props.store.user.on_call == false) {
      if (this.props.store.user.on_patrol == true) {
        console.log('option 5');
        // want to turn 'on patrol' off here
        this.sendPatrolStatus();
      }
        console.log('option 6');
        // want to turn 'on call' on here
        this.sendCallStatus(); 
    }
  }
  
  // This function toggles the value for on_patrol for the user
  sendPatrolStatus = () => {
    this.props.dispatch({
      type: 'ADD_PATROL_STATUS',
      payload: {patrolValue: !this.props.store.user.on_patrol}
    })
  }

  // This function toggles the value for on_call for the user
  sendCallStatus = () => {
    this.props.dispatch({
      type: 'ADD_CALL_STATUS',
      payload: {onCallValue: !this.props.store.user.on_call}
    })
  }

  reportIncident = () => {
    this.props.history.push('/report');
  }

  viewIncidents= () => {
    if (!this.props.store.user.role || this.props.store.user.role < 2){
      this.props.history.push('/community');
    }else if(this.props.store.user.role === 2) {
      this.props.history.push('/member');
    }else if (this.props.store.user.role === 3) {
      this.props.history.push('/admin');
    }
   }
  
  render() {
    return ( 
      <div className="header">
        <div className="titleContainer">
          <Link to="/home">
            <img src="/logo.png" alt="PSC Logo" height="100px"/>
          </Link>

          <div className="patrolDisplay">
            {Number(this.props.store.patrolReducer.length) === 1 && 
              <h3> {this.props.store.patrolReducer.length} person is on patrol</h3>
            }
            {Number(this.props.store.patrolReducer.length) === 0 &&
              <h3>No One is on Patrol</h3>
              }
            {Number(this.props.store.patrolReducer.length) > 1 &&
              <h3>{this.props.store.patrolReducer.length} people are on patrol</h3>
            }
            {Number(this.props.store.onCallReducer.length) === 1 && 
              <h3>{this.props.store.onCallReducer.length} person is on call</h3>
            }
            {Number(this.props.store.onCallReducer.length) === 0 && 
              <h3>No One is On Call</h3>
            }
            {Number(this.props.store.onCallReducer.length) > 1 && 
              <h3>{this.props.store.onCallReducer.length} people are on call</h3>
            }
            <div className="incidents" onClick={this.viewIncidents}>
            {this.props.store.user.role > 1 ?
              <h3> {this.props.store.activeIncidentReducer} active incidents</h3>
              :
              <h3>{this.props.store.publicIncidentReducer.length} Public Incidents</h3>
            }
            </div>
          </div>
        </div>
        <div className="headerBtns">
          {/* on patrol / on call toggles */}
          {this.props.store.user.role > 1 &&
            <div className="toggleForm">
              <label for="onPatrolToggle">On Patrol:</label>
              {this.props.store.user.on_patrol !== undefined &&
                <ToggleSwitch 
                  toggleName="onPatrolToggle"
                  handleToggle={this.handleToggle} 
                  toggleOn={this.props.store.user.on_patrol}
                  name="onPatrolToggle"
                />
              }
              <label for="onCallToggle">On Call:</label>
              {this.props.store.user.on_call !== undefined &&
                <ToggleSwitch 
                  toggleName="onCallToggle"
                  handleToggle={this.handleToggle} 
                  toggleOn={this.props.store.user.on_call}
                  name="onCallToggle"
                />
              }
            </div>
          }  
          <Button variant="warning" onClick={this.reportIncident}> Report an Incident</Button>
        </div>
        <div id="greeting">
            <p>Hello {this.props.store.user.first_name}</p>
        </div>
        <Nav/>
      </div>
    )
  }
}

export default withRouter(connect(mapStoreToProps)(Header));
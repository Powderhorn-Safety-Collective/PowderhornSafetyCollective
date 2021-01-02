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
    // this.props.dispatch({type: 'FETCH_USER'});
    // this.setState({
    //   onPatrol: this.props.store.user.on_patrol,
    //   onCall: false
    // });
    console.log('this.props.store.user', this.props.store.user);
  }

  
  // This function is called whenever either one of the toggles is switched
  // for on patrol or on call
  handleToggle = (event) => {
    // if on patrol is switched from on to off
    if(event.target.name === 'onPatrolToggle' && this.props.store.user.on_patrol == true) {
      console.log('option 1');
      // for this one, we want to only turn off the on patrol boolean
      this.sendPatrolStatus();
    }
    // if on call is switched from on to off
    else if (event.target.name ==='onCallToggle' && this.props.store.user.on_call == true) {
      console.log('option 2');
      // for this one, we want to only turn off the on call boolean
      this.sendCallStatus();
    }
    // if on patrol is switched from off to on
    else if(event.target.name === 'onPatrolToggle' && this.props.store.user.on_patrol == false) {
      if (this.props.store.user.on_call == true) {
        console.log('option 3');
        // want to turn on call off here
        this.sendCallStatus(true);
      }
        console.log('option 4');
        // want to turn on patrol on here
        this.sendPatrolStatus();
    } 
    // if on call is switched from off to on
    else if (event.target.name === 'onCallToggle' && this.props.store.user.on_call == false) {
      if (this.props.store.user.on_patrol == true) {
        console.log('option 5');
        // want to turn on patrol off here
        this.sendPatrolStatus();
      }
        console.log('option 6');
        // want to turn on call on here
        this.sendCallStatus(); 
    }
  }

  sendCallStatus = () => {
    console.log('call');
    this.props.dispatch({
      type: 'ADD_CALL_STATUS',
      payload: {onCallValue: !this.props.store.user.on_call}
    })
  }

  sendPatrolStatus = (param) => {
  console.log('patrol');
  
    this.props.dispatch({
      type: 'ADD_PATROL_STATUS',
      payload: {patrolValue: !this.props.store.user.on_patrol}
    })
  }
  
  reportIncident = () => {
    this.props.history.push('/report');
  }
  
  render() {
    return ( 
      <div className="header">
        <div className="titleContainer">
        {/* {JSON.stringify(this.props.store.user)} */}
        <p> state</p>
        {/* {JSON.stringify(this.state)} */}
          <Link to="/home">
            <img src="/logo.png" alt="PSC Logo" height="100px"/>
          </Link>
          <div className="toggleForm">
            <p>On Patrol</p>
            {this.props.store.user.on_patrol !== undefined &&
            <ToggleSwitch toggleName="onPatrolToggle"
            handleToggle={this.handleToggle} 
            toggleOn={this.props.store.user.on_patrol}
            />
            }
            <p>On Call</p>
            {this.props.store.user.on_call !== undefined &&
            <ToggleSwitch toggleName="onCallToggle"
            handleToggle={this.handleToggle} 
            toggleOn={this.props.store.user.on_call}
            />
            }
          </div>
          <div className="patrolDisplay">
            {Number(this.props.store.patrolReducer.length) === 1 && 
              <h2> {this.props.store.patrolReducer.length} person is on patrol</h2>
            }
            {Number(this.props.store.patrolReducer.length) === 0 &&
              <h2>No One is on Patrol</h2>
              }
            {Number(this.props.store.patrolReducer.length) > 1 &&
              <h2> {this.props.store.patrolReducer.length} people are on patrol</h2>
            }
            {Number(this.props.store.onCallReducer.length) === 1 && <h2>{this.props.store.onCallReducer.length} person is on call</h2>
            }
            {Number(this.props.store.onCallReducer.length) === 0 && <h2>No One is On Call</h2>
            }
            {Number(this.props.store.onCallReducer.length) > 1 && <h2>{this.props.store.onCallReducer.length} people are on call</h2>
            }
            
              <h2> {this.props.store.activeIncidentReducer} active incidents</h2>
          </div>
        </div>
        <div className="headerBtns">
            <Button variant="warning" onClick={this.reportIncident}> Report an Incident</Button>
          </div>
        <Nav/>
        {JSON.stringify(this.props.store.user)}
        {JSON.stringify(this.state)}
      </div>
    )
  }
}

// const mapStoreToProps = reduxStore=> ({
//   reduxStore
// })

export default withRouter(connect(mapStoreToProps)(Header));
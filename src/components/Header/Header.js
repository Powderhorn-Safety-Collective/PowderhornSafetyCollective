import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import "./Header.css";
import Nav from '../Nav/Nav';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';
import Button from "react-bootstrap/Button";
 

class Header extends Component {


  componentDidMount = () => {
    //TO-DO NEED TO CALL THESE DISPATCHES STRATEGICALLY TO ENSURE THEY UPDATE IN REAL TIME
    this.props.dispatch({type: 'FETCH_PATROL'});//get patrol count
    this.props.dispatch({type: 'FETCH_ONCALL'});//get oncall count
    this.props.dispatch({type: 'GET_ACTIVE'}); // dispatch to GET count of all active incidents

  }

  handleToggle = (event) => {
    if(event.target.name === 'onPatrolToggle') {
      this.sendPatrolStatus()  
    }else if(event.target.name === 'onCallToggle') {
      this.sendCallStatus()
    } 
  }

  sendCallStatus = (param) => {
    this.props.dispatch({
      type: 'ADD_CALL_STATUS',
      payload: {onCallValue: !this.props.reduxStore.user.on_call}
    })
  }

  sendPatrolStatus = (param) => {
    this.props.dispatch({
      type: 'ADD_PATROL_STATUS',
      payload: {patrolValue: !this.props.reduxStore.user.on_patrol}
    })
  }

  reportIncident = () => {
    this.props.history.push('/report');
  }

  render() {
    return ( 
      <div className="header">
        <div className="titleContainer">
          <Link to="/home">
            <img src="/logo.png" alt="PSC Logo" height="100px"/>
          </Link>
          <div className="toggleForm">
            {this.props.reduxStore.user.on_patrol !== undefined &&
            <div>
            <p>On Patrol</p>
            <ToggleSwitch toggleName="onPatrolToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.reduxStore.user.on_patrol}
            />
            </div>
            }
            {this.props.reduxStore.user.on_call !== undefined &&
            <div>
            <p>On Call</p>
            <ToggleSwitch toggleName="onCallToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.reduxStore.user.on_call}/>
            </div>
            }
          </div>
          <div className="patrolDisplay">
            {Number(this.props.reduxStore.patrolReducer.length) === 1 && 
              <h2> {this.props.reduxStore.patrolReducer.length} person is on patrol</h2>
            }
            {Number(this.props.reduxStore.patrolReducer.length) === 0 &&
              <h2>No One is on Patrol</h2>
              }
            {Number(this.props.reduxStore.patrolReducer.length) > 1 &&
              <h2> {this.props.reduxStore.patrolReducer.length} people are on patrol</h2>
            }
            {Number(this.props.reduxStore.onCallReducer.length) === 1 && <h2>{this.props.reduxStore.onCallReducer.length} person is on call</h2>
            }
            {Number(this.props.reduxStore.onCallReducer.length) === 0 && <h2>No One is On Call</h2>
            }
            {Number(this.props.reduxStore.onCallReducer.length) > 1 && <h2>{this.props.reduxStore.onCallReducer.length} people are on call</h2>
            }
            
              <h2> {this.props.reduxStore.activeIncidentReducer} active incidents</h2>
          </div>
        </div>
        <div className="headerBtns">
            <Button variant="warning" onClick={this.reportIncident}> Report an Incident</Button>
          </div>
        <Nav/>
      </div>
    )
  }
}

const mapStoreToProps = reduxStore=> ({
  reduxStore
})

export default withRouter(connect(mapStoreToProps)(Header));
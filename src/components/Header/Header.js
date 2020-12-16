import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import "./Header.css";
import Nav from '../Nav/Nav';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';

class Header extends Component {


  componentDidMount = () => {
    //TO-DO NEED TO CALL THESE DISPATCHES STRATEGICALLY TO ENSURE THEY UPDATE IN REAL TIME
    this.props.dispatch({type: 'FETCH_PATROL'});//get patrol count
    this.props.dispatch({type: 'FETCH_ONCALL'});//get oncall count
    this.props.dispatch({type: 'GET_ACTIVE'}); // dispatch to GET count of all active incidents
  }



  render() {
    return ( 
      <div className="header">
        <div className="titleContainer">
          <Link to="/home">
            <h2 className="nav-title">Powderhorn Safety Collective</h2>
          </Link>
          <div className="toggleForm">
            <p>On Patrol</p>
            <ToggleSwitch toggleName="onPatrolToggle"/>
            <p>On Call</p>
            <ToggleSwitch toggleName="onCallToggle"/>
          </div>
          <div className="headerBtns">
            <button> Report an Incident</button>
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
        <Nav/>
      </div>
    )
  }
}

const mapStoreToProps = reduxStore=> ({
  reduxStore
})

export default withRouter(connect(mapStoreToProps)(Header));
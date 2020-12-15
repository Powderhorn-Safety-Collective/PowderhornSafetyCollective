import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import "./Header.css";
import Nav from '../Nav/Nav';

class Header extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_PATROL_COUNT'});
    this.props.dispatch({type: 'GET_ACTIVE'}); // dispatch to GET count of all active incidents
  }

  render() {
    return ( 
      <div className="header">
        <div className="titleContainer">

          <Link to="/home">
            <h2 className="nav-title">Powderhorn Safety Collective</h2>
          </Link>
          <div className="headerBtns">
            <button> Report an Incident</button>
          </div>

          <div className="patrolDisplay">
            {Number(this.props.reduxStore.patrolCountReducer) === 1 && 
              <h2> {this.props.reduxStore.patrolCountReducer} person is on patrol</h2>
            }
            {Number(this.props.reduxStore.patrolCountReducer) === 0 &&
              <h2>No One is on Patrol</h2>
            }
            {Number(this.props.reduxStore.patrolCountReducer) > 1 &&
              <h2> {this.props.reduxStore.patrolCountReducer} people are on patrol</h2>
            }
            <h2>### people are on call</h2>
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
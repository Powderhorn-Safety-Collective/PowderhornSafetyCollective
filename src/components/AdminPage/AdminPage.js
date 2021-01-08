import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatrolItem from '../PatrolItem/PatrolItem.js';
import OnCallItem from '../OnCallItem/OnCallItem.js';
import InternalIncident from '../InternalIncident/InternalIncident';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Admin.css';

class AdminPage extends Component {
  
  componentDidMount = () => {
    this.getUsers();
    this.getIncidents();
    this.getFollowersForIncident();
  }

  // function to fetch all incident data
  getIncidents = () => {
    this.props.dispatch( {type: 'GET_INCIDENTS'});
    console.log('GETTING INCIDENTS');
  }

  // find the people who are following all of the incidents
  getFollowersForIncident = () => {
    this.props.dispatch({type: 'GET_FOLLOWERS_FOR_INCIDENTS'})
  }
  
  // function to fetch all incident data
  getUsers = () => {
    this.props.dispatch( {type: 'GET_ALL_USERS'});
  }

  render() {
    return (
      <Container fluid>
        {/* <h1 className="centerClass" id="welcome">Welcome PSC Admin, {this.props.store.user.username}!</h1> */}
        {/* Row to go across entire page */}
        <Row>
          {/* left stuff for incidents */}
          <Col md={9} xs={12} className="adminLeft">  
            <h1 className="centerClass"> All Incidents</h1>
            {this.props.store.incidentReducer.map((incident) => {
              const incidentFollowers = this.props.store.incidentFollowersReducer;
              const users = this.props.store.allUsersReducer;
              return <InternalIncident incident = {incident} incidentFollowers={incidentFollowers} users={users}/>
            })}
          </Col>{/* end of left section for incident cards */}
          {/* right on patrol / on call display */}
          <Col md={3} xs={12}>
            {/* on patrol display */}
            {this.props.store.patrolReducer.length > 0 && 
            <Row className="onPatrolDisplay">
              <h2>Members on patrol: </h2>
              <ul>  
                {this.props.store.patrolReducer.map((patroller) => {
                  return <PatrolItem patroller={patroller}/>
                })}
              </ul>
            </Row>
            }
            {/* on call display */}
            <Row className="onCallDisplay">
              <h2>Members on call: </h2>
              <ul>  
                {this.props.store.onCallReducer.map((onCall) => {
                  return <OnCallItem onCall={onCall}/>
                })}
              </ul>
            </Row> {/* end on call */}
          </Col>
          {/* </div> end of right on patrol / on call display */}
        </Row>
      </Container> // end of page
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminPage);

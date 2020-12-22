
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import './CommunityPage.css';
import IncidentSearch from '../IncidentSearch/IncidentSearch';
import IncidentModule from '../IncidentModule/IncidentModule';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


// Community Page component
// visible to everyone
// contains organization info and links, a list of incidents, and
// a section for login and a ection to search for an incident
class CommunityPage extends Component {
  state = {
  };

  // GET request is called on page load
  // to retrieve all incident data for incidents marked for public view
  componentDidMount = () => {
    this.getPublicIncidents();
  }

  // function to fetch all incident data for public view
  getPublicIncidents = () => {
    this.props.dispatch( {type: 'GET_PUBLIC_INCIDENTS'});
  }

  render() {
    return (
      <Container fluid>
        <Row>
          {/* This div should have the left stuff */}
          <Col md={6} lg={4}>
            <Row className="box">
              {/* we can put whatever site they want here later */}
              <a target="_blank" href="https://www.facebook.com/Powderhorn-Safety-Collective-110798767447531/" rel="noopener noreferrer">
                <h2>
                  Community Resources
                </h2>
              </a>
            </Row>
            <Row className="box">
              {/* we will change link later */}
              <a target="_blank" href="https://www.facebook.com/Powderhorn-Safety-Collective-110798767447531/" rel="noopener noreferrer">
                <h2>
                  Community Events
                </h2>
              </a>
            </Row>
            <Row className="box">
              <h2>
                PSC Contact Info
              </h2>
            </Row>
            <Row className="box">
              <h2>
                Subscribe to our mailing list
              </h2>
            </Row>
          </Col> {/* end left stuff */}
          {/* middle stuff / incident cards */}
          <Col md={6} lg={4}>
            <Row className="box">
              <h2>
                About Us
              </h2>
            </Row>
            <Row className="box scrollable" >
              <h2>
                Incidents
              </h2>
                {/* incident cards are mapped onto cards for display here */}
                {this.props.store.publicIncidentReducer.map( (publicIncident, index) => {
                  return(
                    <IncidentModule incident={publicIncident} key={index}/>
                  );
                })}
            </Row>
          </Col>{/* end middle stuff */}
          {/* right column stuff / login and search */}
          <Col md={6} lg={4}>
            <Row className="box">
              {/* section to login */}
              <LoginForm/>
            </Row>
            <Row className="box">
              {/* section to search for an incident */}
              <IncidentSearch/>
            </Row>
          </Col> {/* end right stuff */}
        </Row> 
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(CommunityPage);

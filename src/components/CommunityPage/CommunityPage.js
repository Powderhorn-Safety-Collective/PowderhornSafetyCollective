
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
import MailchimpSubscribe from "react-mailchimp-subscribe"





// Community Page component
// visible to everyone
// contains organization info and links, a list of incidents, and
// a section for login and a ection to search for an incident
class CommunityPage extends Component {
  state = {
  };

  

  renderTime = (time) => {
    let timeHour = Number(time.slice(11,13));
    let timeMorningEvening = 'a.m.';
    if (timeHour > 12) {
      timeHour -= 12;
      timeMorningEvening = 'p.m.';
    }
    else if (timeHour === 0) {
      timeHour = 12;
    }
    let timeMinute = time.slice(14, 16);
    let month = Number(time.slice(5,7));
    let day = Number(time.slice(8,10));
    let year = Number(time.slice(0,4));
    let displayTime = timeHour + ':' + timeMinute + ' ' + timeMorningEvening + ' ' + month + '/' + day + '/' + year;
    return displayTime
  }

  // GET request is called on page load
  // to retrieve all incident data for incidents marked for public view
  componentDidMount = () => {
    this.getPublicIncidents();
  }

  // function to fetch all incident data for public view
  getPublicIncidents = () => {
    this.props.dispatch( {type: 'GET_PUBLIC_INCIDENTS'});
  }
  // User can click this button to request a follow up from PSC on an incident
  contactRequest = () => {
    console.log('REQUESTING CONTACT TODO- ADD TWILIO');
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
              <h2><MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL}/></h2>
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
              {/* Render the searched incident to the DOM, not using incident module, because incident will show even if not publicly viewable in this module */}
            {this.props.store.searchIncidentReducer.client_id &&
            <div>
              <p>Incident ID: {this.props.store.searchIncidentReducer.client_id}</p>
              <p>Incident Type: {this.props.store.searchIncidentReducer.type}</p>
              <p>Incident Time: {this.renderTime(this.props.store.searchIncidentReducer.time_submitted)}</p>
              <p>Reporter Notes: {this.props.store.searchIncidentReducer.notes}</p>
              {this.props.store.searchIncidentReducer.active === true ? <p>Incident is Active</p> : <p>Incident is Inactive</p>}
              <button onClick={this.contactRequest}>Request Contact</button>
            </div>
            }
            {/* TODO add sweet alert for no-results */}
            {this.props.store.searchIncidentReducer === "" &&
              <p>No Incident with that ID was found, please try again.</p>
            }
            </Row>
          </Col> {/* end right stuff */}
        </Row> 
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(CommunityPage);



import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './UserPage.css';
import IncidentModule from '../IncidentModule/IncidentModule';
import Mailchimp from 'react-mailchimp-form';
import Button from 'react-bootstrap/Button';

// this will be the page a registered user sees when they log in if they are not a volunteer
class UserPage extends Component {
  
  // GET request is called on page load
  // to retrieve all incident data for incidents marked for public view
  componentDidMount = () => {
    this.getPublicIncidents();
    this.getPersonalIncidents();
    if (this.props.store.user) {
      this.getFollowedIncidentIds();
    }
  }
// get the incidents followed by this user
  getFollowedIncidentIds = () => {
    this.props.dispatch({type: 'GET_FOLLOWED_INCIDENTS'});  
  }

  // function to fetch all incident data for public view
  getPublicIncidents = () => {
    this.props.dispatch( {type: 'GET_PUBLIC_INCIDENTS'});
  }

  // function to fetch incidents this user submitted or is following
  getPersonalIncidents = () => {
    this.props.dispatch({type: 'GET_PERSONAL_INCIDENTS'});
  }


  render() {
    return (
      <Container fluid>
        <Row id="topBoxes">
          {/* This div has the boxes at the top of the page */}
          <div className="box">
            <a className="links" target="_blank" href="https://www.powderhornsafetycollective.org" rel="noopener noreferrer">
              <h2>
                Community Resources
              </h2>
            </a>
          </div>
          <div className="box">
            <a className="links" target="_blank" href="https://www.facebook.com/Powderhorn-Safety-Collective-110798767447531/" rel="noopener noreferrer">
              <h2>
                Community Events
              </h2>
            </a>
          </div>
          <div className="box">
            <h2>
              <a className="emailLink" href='mailto: pohosafetycollective@gmail.com'>Contact Us</a>
            </h2>
          </div>
        </Row>
{/* these Are the incidents */}
        <Row>
          <Col></Col>
          <Col md={8} lg={6} 
            className="userModule">
            <Row className="box scrollable">
              <h2 className="whiteText">
                Incidents
              </h2>
{/* incident cards are mapped onto cards for display here */}
                {this.props.store.publicIncidentReducer.map( (publicIncident, index) => {
                  const followedIncidents = this.props.store.followedIncidentsReducer
                  return(
                    <IncidentModule incident={publicIncident} key={index} followedIncidents={followedIncidents}/>
                  );
                })}
            </Row>
          </Col>
          <Col></Col>

{/* right column with incidents user submitted or is following */}
          <Col md={6} lg={4} className="box scrollable" id="followedIncidentContainer">
            <h3 className="whiteText">Your Followed and Submitted Incidents</h3>
            {this.props.store.personalIncidentReducer.map( (personalIncident, index) => {
              return(
                <div className="white">
                  <p className="yellowBackground"><strong>Incident Number: </strong>{personalIncident.client_id}</p>
                  <p><strong>Incident Type: </strong>{personalIncident.type}</p>
                  <p><strong>Location: </strong>{personalIncident.location}</p>
                  {personalIncident.notes &&
                    <p><strong>Submitter's Notes: </strong>{personalIncident.notes}</p>
                  }
                  {personalIncident.text_for_public_display &&
                    <p><strong>PSC Notes: </strong>{personalIncident.text_for_public_display} </p>
                  }
                  {personalIncident.active === true ?
                    <p className="alert">Active</p>
                  :
                    <p className="alertresolved">Resolved</p>
                  }
                </div>
              );
            })}
          </Col>
          <Col></Col>
        </Row>
        <Row id="newsBox">
          <h4> Sign Up for the PSC Newsletter
            <Mailchimp 
              action='https://gmail.us7.list-manage.com/subscribe/post?u=6648d06c78d7cae5c47a9580d&amp;id=7ab777aba9'
              fields={[
              {
                name: 'EMAIL',
                placeholder: 'Email',
                type: 'email',
                required: true,
              }
              ]}
              messages = {
              {
                sending: "Sending...",
                success: "Thank you for subscribing!",
                error: "An unexpected internal error has occurred, please try again.",
                empty: "You must type in a valid e-mail address.",
                duplicate: "This email has already been used to sign up!",
                button: "Subscribe"
              }
              }
            />
          </h4>
        </Row>
      </Container>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);

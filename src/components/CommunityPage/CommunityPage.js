
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
import Mailchimp from 'react-mailchimp-form'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import swal from 'sweetalert';

// Community Page component
// visible to everyone
// contains organization info and links, a list of incidents, and
// a section for login and a ection to search for an incident
class CommunityPage extends Component {
  
  state = {
    aboutOpen: false,
    missionOpen: false,
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
    if (this.props.store.user) {
      this.getFollowedIncidentIds();
    }
  }

  getFollowedIncidentIds = () => {
    console.log('in personal incident ids');
    this.props.dispatch({type: 'GET_FOLLOWED_INCIDENTS'});
  }

  // function to fetch all incident data for public view
  getPublicIncidents = () => {
    this.props.dispatch( {type: 'GET_PUBLIC_INCIDENTS'});
  }

  // User can click this button to request a follow up from PSC on an incident
  renderContactRequest = (incidentId) => {
    if (this.props.store.user.id) {
      if (this.props.store.followedIncidentsReducer.some(incident => incident.incident_id === incidentId)) {
        console.log('hello');
        return <Button onClick={() => this.unfollowIncident(incidentId)} variant="warning">Stop Following this Incident</Button>
      }
      else {
        return <Button onClick={() => this.followIncident(incidentId)}>Follow this Incident</Button>
      }
    }
    else {
      return <p>You may follow this incident if you are registered as a PSC user and logged in</p>
    }
  }

  // function to dispatch action to follow incident
  followIncident = (incidentId) => {
    console.log('follow incident id', incidentId);
    this.props.dispatch({type: 'FOLLOW_INCIDENT', payload: {incident_Id: incidentId}});
  }

  // function to dispatch action to stop following incident
  unfollowIncident = (incidentId) => {
    console.log('unfollow incident id', incidentId);
    this.props.dispatch({type: 'UNFOLLOW_INCIDENT', payload: {incident_Id: incidentId}});
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
{/* These Are the incidents */}
        <Row>
          <Col></Col>
          <Col md={8} lg={6}    className="communityColumnCenter">
            <Row className="box scrollable" >
              <h2>
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
          </Col>{/* end middle stuff */}
          <Col></Col>
{/* these items will usually display on the Right, login, search, etc */}
          
          <Col md={6} lg={4} className="communityColumnRight">
          {this.props.store.user.role ?
            <></>
            :
            <Row className="box">
{/* section to login */}
              <LoginForm/>
            </Row>
            }
            <Row className="box" id="collapseBox">
              <Button
                onClick={()=> this.setState({aboutOpen: !this.state.aboutOpen})}
                aria-controls="collapseAbout"
                aria-expanded={this.state.aboutOpen}
                className="collapseBtn"
              >About Us</Button>
                <Collapse in={this.state.aboutOpen}>
                  <div id="aboutBody" className="white">
                    The Powderhorn Safety Collective (PSC) envisions a new form of community response that calls upon the resources of the neighborhood rather than the police. 
                    We are neighbors providing support to the community with compassion and care in mind. 
                    As a collective we commit to the practices of nonviolence and de-escalation with the end goal of strengthening the social fabric of the neighborhood.
                  </div>
                </Collapse>
                <Button
                  onClick={()=> this.setState({missionOpen: !this.state.missionOpen})}
                  aria-controls="collapseAbout"
                  aria-expanded={this.state.missionOpen}
                  className="collapseBtn"
                >Mission</Button>
                <Collapse in={this.state.missionOpen}>
                  <div id="missionBody" className="white">
                    <p>
                      The Powderhorn Safety Collective (PSC) envisions a new form of community response that calls upon the resources of the neighborhood rather than the police. 
                      We are neighbors providing support to the community with compassion and care in mind. 
                      As a collective we commit to the practices of nonviolence and de-escalation with the end goal of strengthening the social fabric of the neighborhood.  
                    </p>
                    <p>
                      El Colectivo Seguridad del Powderhorn (PSC) imaginamos una nueva forma de respuesta comunal que solicita a los recursos del vecindario en vez de la policía. 
                      Somos vecinos, proveyendo apoyo a la comunidad, teniendo en mente la compasión y el cuidado. 
                      Como colectivo, nos comprometemos a la práctica de no violencia y la desescalada, con la meta de hacer más fuerte la fábrica social del vecindario.
                    </p>              
                  </div>
                </Collapse>
            </Row>
{/* end of login Column */}
            <Row className="box">
              {/* section to search for an incident */}
              <IncidentSearch/>
              {/* Render the searched incident to the DOM, not using incident module, because incident will show even if not publicly viewable in this module */}
            {this.props.store.searchIncidentReducer.client_id &&
            <div className="white">
              <p className="yellowBackground"><strong>Incident ID: </strong>{this.props.store.searchIncidentReducer.client_id}</p>
              <p><strong>Incident Type: </strong>{this.props.store.searchIncidentReducer.type}</p>
              <p><strong>Incident Time: </strong>{this.renderTime(this.props.store.searchIncidentReducer.time_submitted)}</p>
              <p><strong>Reporter Notes: </strong>{this.props.store.searchIncidentReducer.notes}</p>
              {this.props.store.searchIncidentReducer.active === true ? <p className="alert">Active</p> : <p className = "alert">Resolved</p>}
              {this.renderContactRequest(this.props.store.searchIncidentReducer.id)}
            </div>
            }
            {this.props.store.searchIncidentReducer === "" &&
              <p>No Incident with that ID was found, please try again.</p>
            }
            </Row>
          </Col> 
          {/* end of search incident */}
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

export default connect(mapStoreToProps)(CommunityPage);



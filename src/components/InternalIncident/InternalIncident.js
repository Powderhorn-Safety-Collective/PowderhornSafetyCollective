import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './InternalIncident.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ToggleSwitchInternal from '../ToggleSwitchInternal/ToggleSwitchInternal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AssignClaimComponent from '../AssignClaimComponent/AssignClaimComponent';
import InternalNotes from '../InternalNotes/InternalNotes';
import Button from 'react-bootstrap/Button';
import { formatPhoneNumber } from 'react-phone-number-input';
import swal from 'sweetalert';
import Collapse from 'react-bootstrap/Collapse';

// This component is going to be the card display for the incident
// that appears and is consumed by the Member Page Component.
// It allows a registered volunteer to update which data regarding the incident is seen
// by the public
class InternalIncident extends Component {

  state = {
    publicText : this.props.incident.text_for_public_display || '',
    username_public: this.props.incident.username_public,
    timedate_public: this.props.incident.timedate_public,
    location_public: this.props.incident.location_public,
    type_public: this.props.incident.type_public,
    user_notes_public: this.props.incident.user_notes_public,
    active_public: this.props.incident.active_public,
    active: this.props.incident.active,
    open: false
  }

  // function to render time associated with incident
  renderTime = ( time) => {
    let timeHour = Number(time.slice(11,13));
    let timeMorningEvening = 'a.m.';
    if (timeHour == 12) {
      timeMorningEvening = 'p.m.';
    }
    else if (timeHour == 0) {
      timeHour = 12;
    }
    else if (timeHour > 12) {
      timeHour -= 12;
      timeMorningEvening = 'p.m.';
    }
    let timeMinute = time.slice(14, 16);
    let month = Number(time.slice(5,7));
    let day = Number(time.slice(8,10));
    let year = Number(time.slice(0,4));
    let displayTime = timeHour + ':' + timeMinute + ' ' + timeMorningEvening + ' ' + month + '/' + day + '/' + year;
    return <>{displayTime}</>
  }

  handleChange = (event) => {
    this.setState({
      publicText: event.target.value
    });
  }

  handlePublicTextSave = () => {
    console.log('this.state.publicText', this.state.publicText);
    // send text to database
    this.props.dispatch({
      type: 'UPDATE_PUBLIC_DISPLAY_TEXT',
      payload: {text: this.state.publicText, id: this.props.incident.id}
    });
  }

  // handleToggles takes in the toggle and decides what to do with it depending on
  // which switch it is
  handleToggle = (event) => {
    if(event.target.name.slice(0,14) === 'usernameToggle') { 
      this.setState({
        username_public: !this.state.username_public
      });  
    }
    else if (event.target.name.slice(0,14) === 'timedateToggle') {    
      this.setState({
        timedate_public: !this.state.timedate_public
      });
    }
    else if (event.target.name.slice(0,14) === 'locationToggle') { 
      this.setState({
        location_public: !this.state.location_public
      });
    }
    else if (event.target.name.slice(0, 10) === 'typeToggle') { 
      this.setState({
        type_public: !this.state.type_public
      });
    }
    else if (event.target.name.slice(0, 15) === 'userNotesToggle') {
      this.setState({
        user_notes_public: !this.state.user_notes_public
      });
    }
    else if (event.target.name.slice(0, 12) === 'activeToggle') {
      this.sendActiveStatus();
    }
  }

  // this function will change the state of the 'active' boolean in the incidents table
  sendActiveStatus = () => {
      this.props.dispatch({
          type: 'UPDATE_ACTIVE_STATUS',
          payload: {active: !this.props.incident.active,
          id: this.props.incident.id}
      })
  }

  handlePostNotice = (incidentId) => {
    this.props.dispatch({
      type: 'UPDATE_PUBLIC_POST',
      payload: {
        view_publicly: true,
        username_public: this.state.username_public,
        timedate_public: this.state.timedate_public,
        location_public: this.state.location_public,
        type_public: this.state.type_public,
        user_notes_public: this.state.user_notes_public,
        id: this.props.incident.id
      }
    })
    this.sendMessage(incidentId);
  }

  sendMessage = (incidentId) => {
    const incidentFollowers = this.props.incidentFollowers;
    // check the incidentFollowers for the people following that incident, I hope
    for(let i = 0; i < incidentFollowers.length; i++) {
      if (incidentFollowers[i].incident_id === incidentId) {
        this.props.dispatch({type: 'MAKE_PHONE_MESSAGE_TO_FOLLOWER_FOR_UPDATE', payload: {phone: incidentFollowers[i].phone}});
      }     
    }
  }

  handleDuplicate = () => {
    console.log('duplicate button clicked');
    this.props.dispatch({
      type: 'MARK_DUPLICATE',
      payload: {
        id: this.props.incident.id
      }
    });
    swal('Text has been saved', "", "success");
  }

  renderSubmittedUser = (submittedUserId) => {
    let submittedUserData =  this.props.users.find(user => user.id == submittedUserId)
    return( 
      <div className="incidentHeader">
        <p><strong>Submitted by: </strong>{submittedUserData.username}</p>
        <p><strong>Name: </strong>{submittedUserData.first_name} {submittedUserData.last_name}</p>
        {submittedUserData.address && 
          <p><strong>Address: </strong>{submittedUserData.address}</p>
        }
        <p><strong>Phone: </strong>{formatPhoneNumber(submittedUserData.phone)}</p>
        <p><strong>Email: </strong>{submittedUserData.email}</p>
      </div>
    )
  }

  render() {
    let usernameToggle = `usernameToggle${this.props.incident.id}`;
    let timedateToggle = `timedateToggle${this.props.incident.id}`;
    let locationToggle = `locationToggle${this.props.incident.id}`;
    let typeToggle = `typeToggle${this.props.incident.id}`;
    let userNotesToggle = `userNotesToggle${this.props.incident.id}`;
    let activeToggle = `activeToggle${this.props.incident.id}`;
    return (
      <Container className="centerClass" fluid>
          {/* Row for all the stuff inside of the container */}
          <Row className="internalRow">
            <Col lg={12} xs={12}>
              <h3 className="yellowBackground">Incident Number: {this.props.incident.client_id}</h3>
            </Col>
            <Col lg={12} xs={12}>
            {this.props.incident.duplicate_entry === true &&
                <h2 className="alert">*THIS IS A DUPLICATE OF ANOTHER INCIDENT*</h2>
              }
            {!this.props.incident.assigned && this.props.incident.duplicate_entry === false &&
              <h2 className="redBackground">THIS INCIDENT IS NEW</h2>
            }
              {this.props.incident.submitted_user != undefined && this.props.users.length > 0 ?
                this.renderSubmittedUser(this.props.incident.submitted_user)
              :
                <p>
                  The user who submitted the incident is not registered
                </p>
              }
            </Col>
            <Col lg={12} xs={12}>
            {/* Row for all the stuff inside the box */}
              {/* <Row> */}
                <div className="internalModule">
              <br/>
              {/* toggle for active/inactive goes here 
              This will change the data directly in the database when toggled*/}
              {this.props.incident.active !== undefined &&
                <ToggleSwitch toggleName={activeToggle}
                  className="internalLine"
                  handleToggle={this.handleToggle} toggleOn={this.props.incident.active}
                />
              }
              <p className="internalLine">Active Incident? </p>
              <br/>
              <br/>
                {/* Need to display name   */}
                {/* {this.props.incident.assigned ?
                  <h4>This incident is assigned to: {this.props.incident.assigned}</h4>
                  :
                  <h4>This incident is not assigned to anyone.</h4>
                } */}
                <AssignClaimComponent incidentId={this.props.incident.id} incident={this.props.incident}/>
                <div>
                  <InternalNotes incidentId={this.props.incident.id}/>
                </div>
                <div className="whiteBackground">
                <br/>
                <h2 className="yellowBackground">Information Provided by Reporter</h2>
                <div className="internalLine">
                  <h5
                    onClick={(()=>this.setState({open: !this.state.open}))}
                    aria-controls="collapseInstructions"
                    aria-expanded={this.state.open}
                    className="greyBackground"
                    >Click Here For Public Post Instructions
                  </h5>
                  <Collapse in={this.state.open} className="internalLine">
                  <ol>
                    <li>Select data to include in public post using toggles below</li>
                    <li>Enter text for headline of public post</li>
                    <li>Click Post (or Update) Public Notice</li>
                  </ol>
                  </Collapse>
                </div>
                <div>
                {/* username toggle here to select if username is viewable on the public post*/}
                <br/>
                <p className="internalLine"><strong>Submitted by: </strong>{this.props.incident.username}</p>
                {this.props.incident.username_public !== undefined &&
                  <ToggleSwitchInternal toggleName={usernameToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.username_public}
                  />
                }

                {/* location toggle here to select if location is viewable on the public post */}
                <br/>
                <br/>
                <p className="internalLine"><strong> Location: </strong>{this.props.incident.location}</p>
                {this.props.incident.location_public !== undefined &&
                  <ToggleSwitchInternal toggleName={locationToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.location_public}
                  />
                }

                {/* type toggle here to select if type is viewable on the public post */}
                <br/>
                <br/>
                <p className="internalLine"><strong>Incident Type:</strong>{this.props.incident.type}</p>
                {this.props.incident.type_public !== undefined &&
                  <ToggleSwitchInternal toggleName={typeToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.type_public}
                  />
                }

                {/* user notes toggle here to select if user notes are viewable on the public post */}
                <br/>
                <br/>
                <p className="internalLine"><strong>Submitter Notes:</strong>{this.props.incident.notes}</p>
                {this.props.incident.user_notes_public !== undefined &&
                  <ToggleSwitchInternal toggleName={userNotesToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.user_notes_public}
                  />
                }

                {/* timedate toggle here to select if timedate is viewable on the public post */}
                <br/>
                <br/>
                <p className="internalLine"><strong>Time Submitted:</strong> {this.renderTime(this.props.incident.time_submitted)}</p>
                {this.props.incident.timedate_public !== undefined &&
                  <ToggleSwitchInternal toggleName={timedateToggle}
                    className="internaLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.timedate_public}
                  />
                }
                <br/>
                <br/>
                </div>
                </div>
                <br/>
                <label htmlFor="publicText">
                  Enter a Headline for This Public Post Below
                </label>
                <br/>
                <textarea 
                  id="publicText"
                  placeholder="Text for public post"
                  onChange={(event) => this.handleChange(event)}
                  value={this.state.publicText}
                />
                <br/>
                <Button
                  variant="success" 
                  onClick={this.handlePublicTextSave} 
                  className="btn"
                >
                  Save Public Display Text
                </Button>
                <br/>
            {/* </Row> */}

            {this.props.incident.duplicate_entry === false &&
            <div className="centerClass">
              <br/>
              <Button
                variant="warning" 
                onClick={this.handleDuplicate} 
                className="btn"
              >
                Mark Incident as Duplicate
              </Button>
              </div>
              } 

              <div className="centerClass">
              <br/>
              {this.props.incident.view_publicly === false ?
                <Button
                  variant="success" 
                  onClick={() => this.handlePostNotice(this.props.incident.id)} 
                  className="btn finalButton"
                >
                  POST PUBLIC NOTICE
                </Button>
              :
                <Button
                  variant="success" 
                  onClick={() => this.handlePostNotice(this.props.incident.id)} 
                  className="btn finalButton"
                >
                  UPDATE PUBLIC NOTICE
                </Button>
            }
              </div>
            </div>
            <h2>_____**_____</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(InternalIncident);

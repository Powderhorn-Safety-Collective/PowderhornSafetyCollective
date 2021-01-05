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
    active: this.props.incident.active
  }


  // function to render time associated with incident
  renderTime = ( time) => {
    let timeHour = Number(time.slice(11,13));
    console.log('timeHour', timeHour);
    
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
    return <p>{displayTime}</p>
  }

  handleChange = (event) => {
    this.setState({
      publicText: event.target.value
    })
  }

  handlePublicTextSave = () => {
    console.log('this.state.publicText', this.state.publicText);
    // send text to database
    this.props.dispatch({
      type: 'UPDATE_PUBLIC_DISPLAY_TEXT',
      payload: {text: this.state.publicText, id: this.props.incident.id}
    })
  }

  // handleToggles takes in the toggle and decides what to do with it depending on
  // which switch it is
  handleToggle = (event) => {
    console.log('event.target.name', event.target.name);
    
    if(event.target.name.slice(0,14) === 'usernameToggle') {
        console.log('username toggle');
        
      this.setState({
        username_public: !this.state.username_public
      });  
    }
    else if (event.target.name.slice(0,14) === 'timedateToggle') {
      console.log('timedate toggle');
      
      this.setState({
        timedate_public: !this.state.timedate_public
      });
    }
    else if (event.target.name.slice(0,14) === 'locationToggle') {
      console.log('location toggle');
      
      this.setState({
        location_public: !this.state.location_public
      });
    }
    else if (event.target.name.slice(0, 10) === 'typeToggle') {
      console.log('type toggle');
      
      this.setState({
        type_public: !this.state.type_public
      });
    }
    else if (event.target.name.slice(0, 15) === 'userNotesToggle') {
      console.log('usernotes toggle');
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
      console.log('switchtoggled');
      
      this.props.dispatch({
          type: 'UPDATE_ACTIVE_STATUS',
          payload: {active: !this.props.incident.active,
          id: this.props.incident.id}
      })
  }

  handlePostNotice = (incidentId) => {
    console.log('post button clicked');
    console.log('this.state in handlePostNotice', this.state);
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
      console.log('for', incidentFollowers[i].incident_id, incidentId);
      
      if (incidentFollowers[i].incident_id === incidentId) {
        console.log('################', incidentFollowers[i].phone);
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
  }

  
  render() {
    let usernameToggle = `usernameToggle${this.props.incident.id}`;
    let timedateToggle = `timedateToggle${this.props.incident.id}`;
    let locationToggle = `locationToggle${this.props.incident.id}`;
    let typeToggle = `typeToggle${this.props.incident.id}`;
    let userNotesToggle = `userNotesToggle${this.props.incident.id}`;
    let activeToggle = `activeToggle${this.props.incident.id}`;
    return (
      <Container fluid>
          {/* Row for all the stuff inside of the container */}
          {JSON.stringify(this.props.incidentFollowers)}
          <Row className="internalRow">
            {/* left stuff for user info for person who submitted incident, if available*/}
            <Col lg={3}>
              {this.props.incident.username ?
                <>
                  <p>Submitted by: {this.props.incident.username}</p>
                  <p>Name: {this.props.incident.first_name} {this.props.incident.last_name}</p>
                  {this.props.incident.address && 
                    <p>Address: {this.props.incident.address}</p>
                  }
                  <p>Phone: {this.props.incident.phone}</p>
                  {this.props.incident.email && 
                  <p>email: {this.props.incident.email}</p>}
                </>
              :
                <p>
                  The user who submitted the incident is not registered
                </p>
              }
            </Col>
            <Col lg={9} xs={12}>
            {/* Row for all the stuff inside the box */}
              <Row>
                <div className="internalModule">
                <h3>Incident Number: {this.props.incident.client_id}</h3>
                {/* Need to display name   */}
                <h4>This incident is assigned to: {this.props.incident.assigned}</h4>
                <div>
                  <InternalNotes incidentId={this.props.incident.id}/>
                </div>
                {/* username toggle here to select if username is viewable on the public post*/}
                {this.props.incident.username_public !== undefined &&
                  <ToggleSwitchInternal toggleName={usernameToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.username_public}
                  />
                }
                <p className="internalLine">Submitted by: {this.props.incident.username}</p>
                <br/>

                {/* timedate toggle here to select if timedate is viewable on the public post */}
                {this.props.incident.timedate_public !== undefined &&
                  <ToggleSwitchInternal toggleName={timedateToggle}
                    className="internaLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.timedate_public}
                  />
                }
                {this.renderTime( this.props.incident.time_submitted)}
                <br/>

                {/* location toggle here to select if location is viewable on the public post */}
                {this.props.incident.location_public !== undefined &&
                  <ToggleSwitchInternal toggleName={locationToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.location_public}
                  />
                }
                <p className="internalLine"> Location: {this.props.incident.location}</p>
                <br/>

                {/* type toggle here to select if type is viewable on the public post */}
                {this.props.incident.type_public !== undefined &&
                  <ToggleSwitchInternal toggleName={typeToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.type_public}
                  />
                }
                <p className="internalLine">Type: {this.props.incident.type}</p>
                <br/>

                {/* user notes toggle here to select if user notes are viewable on the public post */}
                {this.props.incident.user_notes_public !== undefined &&
                  <ToggleSwitchInternal toggleName={userNotesToggle}
                    className="internalLine"
                    handleToggle={this.handleToggle} toggleOn={this.props.incident.user_notes_public}
                  />
                }
                <p className="internalLine">User Notes: {this.props.incident.notes}</p>

                <br/>
                <label htmlFor="publicText">
                  Text to be displayed at beginning of public post:
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
              </div>
            </Row>
            <br/>
            <Row>
              {/* toggle for active/inactive goes here 
              This will change the data directly in the database when toggled*/}
              {this.props.incident.active !== undefined &&
                <ToggleSwitch toggleName={activeToggle}
                  className="internalLine"
                  handleToggle={this.handleToggle} toggleOn={this.props.incident.active}
                />
              }
              <p className="internalLine">Active Incident? </p>
              <Button
                variant="warning" 
                onClick={this.handleDuplicate} 
                className="btn"
              >
                Mark as Duplicate
              </Button>
              <AssignClaimComponent incidentId={this.props.incident.id}/>
              <Button
                variant="success" 
                onClick={() => this.handlePostNotice(this.props.incident.id)} 
                className="btn"
              >
                Post Public Notice
              </Button>

            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(InternalIncident);

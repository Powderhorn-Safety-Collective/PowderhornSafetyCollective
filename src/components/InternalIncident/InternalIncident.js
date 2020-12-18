import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './InternalIncident.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

// This component is going to be the card display for the incident
// that appears and is consumed by the Community Page Component
class InternalIncident extends Component {

  state = {
    publicText : this.props.incident.text_for_public_display || '',
    username_public: this.props.incident.username_public,
    timedate_public: this.props.incident.timedate_public,
    location_public: this.props.incident.location_public,
    type_public: this.props.incident.type_public,
    user_notes_public: this.props.incident.user_notes_public
  }

  // function to render active or inactive on incident card
  renderStatus = ( active) => {
    if ( active === true) {
      return <p className="active">Active</p>
    }
    else if ( active === false) {
      return <p className="active">Inactive</p>
    }
  }

  // function to render time associated with incident
  renderTime = ( time) => {
    let timeHour = Number(time.slice(11,13));
    let timeMorningEvening = 'a.m.';
    if (timeHour > 12) {
      timeHour -= 12;
      timeMorningEvening = 'p.m.';
    }
    else if (timeHour == 0) {
      timeHour = 12;
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

  handleToggle = (event) => {
    if(event.target.name === 'usernameToggle') {
      this.setState({
        username_public: !this.state.username_public
      });  
    }
    else if (event.target.name === 'timedateToggle') {
      this.setState({
        timedate_public: !this.state.timedate_public
      });
    }
    else if (event.target.name === 'locationToggle') {
      this.setState({
        location_public: !this.state.location_public
      });
    }
    else if (event.target.name === 'typeToggle') {
      this.setState({
        type_public: !this.state.type_public
      });
    }
    else if (event.target.name === 'userNotesToggle') {
      this.setState({
        user_notes_public: !this.state.user_notes_public
      });
    }
  }

  // need function here to dispatch, I guess

  render() {
    return (
      <div className="internalModule">
        <h3>Incident Number: {this.props.incident.client_id}</h3>
        {JSON.stringify(this.props.incident)}
        {JSON.stringify(this.state)}
        {this.renderStatus( this.props.incident.active)}
        {/* username toggle here */}
        {this.props.incident.username_public !== undefined &&
          <ToggleSwitch toggleName="usernameToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.incident.username_public}
          />
        }
        <p>Submitted by: {this.props.incident.username}</p>
        {/* time/date toggle here */}
        {this.props.incident.timedate_public !== undefined &&
          <ToggleSwitch toggleName="timedateToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.incident.timedate_public}
          />
        }
        {this.renderTime( this.props.incident.time_submitted)}
        {/* location toggle goes here */}
        {this.props.incident.location_public !== undefined &&
          <ToggleSwitch toggleName="locationToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.incident.location_public}
          />
        }
        <p>Location: {this.props.incident.location}</p>
        {/* type toggle goes here */}
        {this.props.incident.type_public !== undefined &&
          <ToggleSwitch toggleName="typeToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.incident.type_public}
          />
        }
        <p>Type: {this.props.incident.type}</p>
        {/* toggle for user notes goes here */}
        {this.props.incident.user_notes_public !== undefined &&
          <ToggleSwitch toggleName="userNotesToggle"
            handleToggle={this.handleToggle} toggleOn={this.props.incident.user_notes_public}
          />
        }
        <p>User Notes: {this.props.incident.notes}</p>
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
        <button 
          onClick={this.handlePublicTextSave} 
          className="btn"
        >
          Save Public Display Text
        </button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(InternalIncident);

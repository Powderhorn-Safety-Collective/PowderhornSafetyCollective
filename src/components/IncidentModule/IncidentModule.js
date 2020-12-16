import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './IncidentModule.css'

// This component is going to be the card display for the incident
// that appears and is consumed by the Community Page Component
class IncidentModule extends Component {

  // function to render active or inactive on incident card
  renderStatus = (publicDisplayActive, active) => {
    if (publicDisplayActive === true && active === true) {
      return <p className="active">Active</p>
    }
    else if (publicDisplayActive === true && active === false) {
      return <p className="active">Inactive</p>
    }
  }

  // function to render time associated with incident
  renderTime = (publicDisplayTime, time) => {
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
    if (publicDisplayTime === true) {
      return <p>{displayTime}</p>
    }
  }

  render() {
    return (
      <div className="module">
        <h3>{this.props.incident.text_for_public_display}</h3>
        <h3>Incident Number: {this.props.incident.client_id}</h3>
        {/* these other functions get called to display the active/inactive status and time*/}
        {this.renderStatus(this.props.incident.active_public, this.props.incident.active)}
        {this.renderTime(this.props.incident.timedate_public, this.props.incident.time_submitted)}
        {/* short circuit AND operator used for rest*/}
        {this.props.incident.location_public &&
          <p>Location: {this.props.incident.location}</p>
        }
        {this.props.incident.type_public &&
          <p>Type: {this.props.incident.type}</p>
        }
        {this.props.incident.username_public && 
          <p>Submitted by: {this.props.incident.username}</p>
        }
        {this.props.incident.user_notes_public &&
          <p>User Notes: {this.props.incident.notes}</p>
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IncidentModule);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './IncidentModule.css'

// This component is going to be the card display for the incident
// that appears and is consumed by the Community Page Component
class IncidentModule extends Component {

  // function to render time associated with incident
  renderTime = (publicDisplayTime, time) => {
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
    if (publicDisplayTime === true) {
      return <p>{displayTime}</p>
    }
  }

  render() {
    return (
      <div className="module">
        <h5>{this.props.incident.text_for_public_display}</h5>
        <h5>Incident Number: {this.props.incident.client_id}</h5>
        {/* active/inactive status will always be shown for incident */}
        {this.props.incident.active ?
          <p className="active">Active</p>
          :
          <p className="active">Inactive</p>
        }
        {/* this function gets called to display time submitted*/}
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

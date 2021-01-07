import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

class IncidentHistoryItem extends Component {

  editIncident = (id) => {
    this.props.dispatch( {type: 'EDIT_INCIDENT', payload: id} );
    this.props.history.push("/editIncidentModal");
  }

  // this function grabs all notes tied to specific incident and throws them into an array
  notesFunction = () => {
    let array = '';
    for(let i = 0; i < this.props.store.internalNoteReducer.length; i++) {
      if(this.props.store.internalNoteReducer[i].incident_id === this.props.incident.id) { // check to match incident_id with incident.id lol
        array = array += `•` + this.props.store.internalNoteReducer[i].text + '\n'; // added bullet point and line break at end for visibility
      }
    }
    return array;
  }
  
  // function to render time associated with incident
  renderTime = (time) => {
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
    return <p>{displayTime}</p>
    
  }
    
  render() {
    return (
        // table displaying all incident data from all users
        <tr>
            <td>{this.props.incident.client_id}</td>
            <td>{this.props.incident.type}</td>
            <td>{this.props.incident.notes}</td>
            <td>{this.props.incident.location}</td>
            {this.renderTime(this.props.incident.time_submitted)} {/* This calls the function to print the time for the incident */}
            <td>{this.props.incident.active.toString()}</td>
            <td>{this.props.incident.view_publicly.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.notesFunction()}</td>
            <td>{this.props.incident.duplicate_entry.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.incident.username}</td> {/* Fix this line*/}

            {/* trash can row to delete incident? */}
            <td className="edit" onClick={() => this.editIncident(this.props.incident)}><span role="img" aria-labelledby="cute pencil">✏️</span></td>
            <td className="trash"><span role="img" aria-labelledby="trash bin">🗑️</span></td>
        </tr>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(IncidentHistoryItem));
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

    
  render() {
    return (
        // table displaying all incident data from all users
        <tr>
            <td>{this.props.incident.id}</td>
            <td>{this.props.incident.type}</td>
            <td>{this.props.incident.notes}</td>
            <td>{this.props.incident.location}</td>
            <td>{this.props.incident.time_submitted.substring(0, 10)}</td> {/* substring method to truncate timestamp data type */}
            <td>{this.props.incident.active}</td>
            <td>{this.props.incident.view_publicly.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.notesFunction()}</td>
            <td>{this.props.incident.duplicate_entry.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.incident.client_id}</td>

            {/* trash can row to delete incident? */}
            <td className="edit" onClick={() => this.editIncident(this.props.incident)}><span role="img" aria-labelledby="cute pencil">✏️</span></td>
            <td className="trash"><span role="img" aria-labelledby="trash bin">🗑️ </span></td>
        </tr>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(IncidentHistoryItem));

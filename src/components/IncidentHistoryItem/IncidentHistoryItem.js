import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class TemplateClass extends Component {
    
  render() {
    return (
        // table displaying all incident data from all users
        <tr>
            <td>{this.props.incident.id}</td>
            <td>{this.props.incident.type}</td>
            <td>{this.props.incident.notes}</td>
            <td>{this.props.incident.location}</td>
            <td>{this.props.incident.time_submitted.substring(0, 10)}</td> {/* substring method to truncate timestamp data type */}
            <td>{this.props.incident.status}</td>
            <td>{this.props.incident.view_publicly.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.incident.responder_notes}</td>
            <td>{this.props.incident.duplicate_entry.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.incident.client_id}</td>

            {/* trash can row to delete incident? */}
            <td className="trash" onClick={this.delete}><span role="img" aria-labelledby="trash bin">🗑️ </span></td>
        </tr>
    );
  }
}

export default connect(mapStoreToProps)(TemplateClass);

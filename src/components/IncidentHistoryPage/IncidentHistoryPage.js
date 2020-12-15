import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import IncidentHistoryItem from '../IncidentHistoryItem/IncidentHistoryItem';

import './Tables.css';

class TemplateClass extends Component {

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getIncidents();
      }

    // function to fetch all incident data
    getIncidents = () => {
        console.log('getting incidents');
        this.props.dispatch( {type: 'GET_INCIDENTS'});
    }

    // this component is intended to display the history of all incidents reported by all users
  render() {
    return (
      <div>
        <h2>Incident Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Type</th>
                        <th>Notes</th>
                        <th>Location</th>
                        <th>Time Submitted</th>
                        <th>Status</th>
                        <th>Public</th>
                        <th>Responder Notes</th>
                        <th>Duplicate</th>
                        <th>User Who Reported Incident</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map through incidentReducer data and passing it along to HistoryItem */}
                    {this.props.store.incidentReducer.map( (incident, index) => {
                        return(
                            <IncidentHistoryItem incident={incident} key={index}/>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="11"></td>
                    </tr>
                </tfoot>
            </table>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(TemplateClass);

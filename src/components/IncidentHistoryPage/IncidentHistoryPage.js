import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import IncidentHistoryItem from '../IncidentHistoryItem/IncidentHistoryItem';

import './IncidentHistoryPage.css';

class IncidentHistoryPage extends Component {

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getIncidents();
        this.props.dispatch( {type: 'GET_NOTES'}); // need this to access reducer
      }

    // function to fetch all incident data
    getIncidents = () => {
        this.props.dispatch( {type: 'GET_INCIDENTS'});
    }

    // below are functions used to sort incident table by column
    sortByClient = () => {
      this.props.dispatch( {type:'SORT_CLIENT'} );
    }
    sortByType = () => {
        this.props.dispatch( {type:'SORT_TYPE'} );
      }
      sortByNotes = () => {
        this.props.dispatch( {type:'SORT_NOTES'} );
      }
      sortByLocation = () => {
        this.props.dispatch( {type:'SORT_LOCATION'} );
      }
      sortByTime = () => {
        this.props.dispatch( {type:'SORT_TIME'} );
      }
      sortByStatus = () => {
        this.props.dispatch( {type:'SORT_STATUS'} );
      }
      sortByPublic = () => {
        this.props.dispatch( {type:'SORT_PUBLIC'} );
      }
      sortByResponder = () => {
        this.props.dispatch( {type:'SORT_RESPONDER'} );
      }
      sortByDuplicate = () => {
        this.props.dispatch( {type:'SORT_DUPLICATE'} );
      }
      sortBySubmittedUser = () => {
        this.props.dispatch( {type:'SORT_SUBMITTED_USER'} );
      }
      // end of sorting functions

    // this component is intended to display the history of all incidents reported by all users
  render() {
    return (
      <div>
        <p>editIncidentReducer:</p>
        {JSON.stringify(this.props.store.editIncidentReducer)}
        <h2>Incident Table</h2>
        <p>internalNoteReducer: {JSON.stringify(this.props.store.internalNoteReducer)}</p>
            <table>
                <thead>
                    <tr>
                        <th onClick={this.sortByClient}>Id</th>
                        <th onClick={this.sortByType}>Type</th>
                        <th onClick={this.sortByNotes}>Notes</th>
                        <th onClick={this.sortByLocation}>Location</th>
                        <th onClick={this.sortByTime}>Time Submitted</th>
                        <th onClick={this.sortByStatus}>Status</th>
                        <th onClick={this.sortByPublic}>Public</th>
                        <th onClick={this.sortByResponder}>Responder Notes</th>
                        <th onClick={this.sortByDuplicate}>Duplicate</th>
                        <th onClick={this.sortBySubmittedUser}>User Who Reported Incident</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map through incidentReducer data and passing it along to HistoryItem */}
                    {this.props.store.incidentReducer.map( (incident, index) => {
                        const notes = this.props.store.internalNoteReducer.text
                        return(
                            <IncidentHistoryItem incident={incident} key={index} notes={notes}/>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="12"></td>
                    </tr>
                </tfoot>
            </table>
            <br/>


      </div>
    );
  }
}

export default connect(mapStoreToProps)(IncidentHistoryPage);
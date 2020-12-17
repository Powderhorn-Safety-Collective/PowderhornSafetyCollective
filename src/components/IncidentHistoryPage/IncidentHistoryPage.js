import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import IncidentHistoryItem from '../IncidentHistoryItem/IncidentHistoryItem';

import './Tables.css';

class IncidentHistoryPage extends Component {

  state = {
    type: '',
    notes: '',
    location: '',
    time_submitted: '',
    status: '',
    view_publicly: '',
    responder_notes: '',
    duplicate_entry: '',
    client_id: ''
    
  }

  handleChange = (event, typeParam) => {
    console.log(event.target.value, typeParam);

    this.setState( {
        [typeParam]: event.target.value
    })
  }

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getIncidents();
      }

    // function to fetch all incident data
    getIncidents = () => {
        this.props.dispatch( {type: 'GET_INCIDENTS'});
    }

    // below are functions used to sort incident table by column
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
      sortByClient = () => {
        this.props.dispatch( {type:'SORT_CLIENT'} );
      }
      // end of sorting functions

      submitEdit = () => {
        console.log('editing incident');
        // this.props.dispatch( {type: 'EDIT_USER'} );
      }

    // this component is intended to display the history of all incidents reported by all users
  render() {
    return (
      <div>
        <p>editIncidentReducer:</p>
        {JSON.stringify(this.props.store.editIncidentReducer)}
        <h2>Incident Table</h2>
        <p>state</p>
        {JSON.stringify(this.state)}
            <table>
                <thead>
                    <tr>
                        <th onClick={this.getIncidents}>Id</th>
                        <th onClick={this.sortByType}>Type</th>
                        <th onClick={this.sortByNotes}>Notes</th>
                        <th onClick={this.sortByLocation}>Location</th>
                        <th onClick={this.sortByTime}>Time Submitted</th>
                        <th onClick={this.sortByStatus}>Status</th>
                        <th onClick={this.sortByPublic}>Public</th>
                        <th onClick={this.sortByResponder}>Responder Notes</th>
                        <th onClick={this.sortByDuplicate}>Duplicate</th>
                        <th onClick={this.sortByClient}>User Who Reported Incident</th>
                        <th>Edit</th>
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
                        <td colSpan="12"></td>
                    </tr>
                </tfoot>
            </table>
            <br/>

                  {this.props.store.editIncidentReducer ? 
                    <div className="editModal">
                      <label>Type</label>
                      <input defaultValue={this.props.store.editIncidentReducer.type} onChange={(event) => this.handleChange(event, 'type')} type="text"></input>
                      <br/>
                      <label>Notes</label>
                      <input defaultValue={this.props.store.editIncidentReducer.notes} onChange={(event) => this.handleChange(event, 'notes')} type="text"></input>
                      <br/>
                      <label>Location</label>
                      <input defaultValue={this.props.store.editIncidentReducer.location} onChange={(event) => this.handleChange(event, 'location')} type="text"></input>
                      <br/>
                      <label>Time Submitted</label>
                      <input defaultValue={this.props.store.editIncidentReducer.time_submitted} onChange={(event) => this.handleChange(event, 'time_submitted')} type="text"></input>
                      <br/>
                      <label>Status</label>
                      <input defaultValue={this.props.store.editIncidentReducer.status} onChange={(event) => this.handleChange(event, 'status')} type="text"></input>
                      <br/>
                      <label>View Publicly</label>
                      <input defaultValue={this.props.store.editIncidentReducer.view_publicly} onChange={(event) => this.handleChange(event, 'view_publicly')} type="text"></input>
                      <br/>
                      <label>Responder Notes</label>
                      <input defaultValue={this.props.store.editIncidentReducer.responder_notes} onChange={(event) => this.handleChange(event, 'responder_notes')} type="text"></input>
                      <br/>
                      <label>Duplicate</label>
                      <input defaultValue={this.props.store.editIncidentReducer.duplicate_entry} onChange={(event) => this.handleChange(event, 'duplicate_entry')} type="text"></input>
                      <br/>
                      <label>Client Id</label>
                      <input defaultValue={this.props.store.editIncidentReducer.client_id} onChange={(event) => this.handleChange(event, 'client_id')} type="text"></input>
                      <br/>
                      <button onClick={this.submitEdit}>Submit Edit</button>
                    </div>
                  :
                  <></>
                  }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IncidentHistoryPage);
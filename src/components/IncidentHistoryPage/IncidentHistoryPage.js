import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import TestTable from '../TestTable/TestTable';

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
    // sortByClient = () => {
    //   this.props.dispatch( {type:'SORT_CLIENT'} );
    // }
    // sortByType = () => {
    //     this.props.dispatch( {type:'SORT_TYPE'} );
    //   }
    //   sortByNotes = () => {
    //     this.props.dispatch( {type:'SORT_NOTES'} );
    //   }
    //   sortByLocation = () => {
    //     this.props.dispatch( {type:'SORT_LOCATION'} );
    //   }
    //   sortByTime = () => {
    //     this.props.dispatch( {type:'SORT_TIME'} );
    //   }
    //   sortByStatus = () => {
    //     this.props.dispatch( {type:'SORT_STATUS'} );
    //   }
    //   sortByPublic = () => {
    //     this.props.dispatch( {type:'SORT_PUBLIC'} );
    //   }
    //   sortByResponder = () => {
    //     this.props.dispatch( {type:'SORT_RESPONDER'} );
    //   }
    //   sortByDuplicate = () => {
    //     this.props.dispatch( {type:'SORT_DUPLICATE'} );
    //   }
    //   sortBySubmittedUser = () => {
    //     this.props.dispatch( {type:'SORT_SUBMITTED_USER'} );
    //   }
      // end of sorting functions

    // this component is intended to display the history of all incidents reported by all users
  render() {
    return (
      <div>
        <h2 className="centerClass">Incident Table</h2>
          <TestTable incident={this.props.store.incidentReducer}/>

                {/* {this.props.store.incidentReducer.map( (incident, index) => {
                  const notes = this.props.store.internalNoteReducer.text
                    return(
                      <TestTable incident={incident} key={index} notes={notes}/>
                    );
                })} */}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(IncidentHistoryPage);
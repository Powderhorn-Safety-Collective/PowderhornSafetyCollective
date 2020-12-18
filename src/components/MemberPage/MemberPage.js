import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatrolItem from '../PatrolItem/PatrolItem.js';
import OnCallItem from '../OnCallItem/OnCallItem';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './MemberPage.css';
import InternalIncident from '../InternalIncident/InternalIncident';

// member page will be what PSC members see when they log in
class MemberPage extends Component {

  componentDidMount = () => {
    this.getIncidents();
  }

  // function to fetch all incident data
  getIncidents = () => {
    this.props.dispatch( {type: 'GET_INCIDENTS'});
  }

  render() {
    return ( 
      <div>
        <h1 id="welcome">Welcome PSC Volunteer, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <main className="row">
          <div className="memberLeft"> {/* left stuff for incidents */}
            
            <h1> All Incidents</h1>

            {this.props.store.incidentReducer.map((incident) => {
              return <InternalIncident incident = {incident} />
            })}
          </div> {/* end of left incident stuff */}

          {/* right on patrol / on call display */}
          <div className="memberRight">
            {/* on patrol display */}
            <div class="onPatrolDisplay">
              <h2>Members on patrol: </h2>
              <ul>  
                {this.props.store.patrolReducer.map((patroller) => {
                  return <PatrolItem patroller={patroller}/>
                })}
              </ul>
            </div>
            {/* on call display */}
            <div class="onCallDisplay">
              <h2>Members on call: </h2>
              <ul>  
                {this.props.store.onCallReducer.map((onCall) => {
                  return <OnCallItem onCall={onCall}/>
                })}
              </ul>
            </div> {/* end on call */}
          </div> {/* end of right on patrol / on call display */}
        </main>
      </div> // end of page
    );
  }
}


export default connect(mapStoreToProps)(MemberPage);

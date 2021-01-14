import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';

class AssignClaimComponent extends Component {

  state= {
    assigning: {
      assigned: 0,
      incident: 0,
    }
  }

  // sets local state to selected PSC member and incident id
  handleChange = (event, param) => {
    this.setState ({
      assigning:{
        assigned: event.target.value,
        incident: param
      }
    });
  }

  // dispatches request to add assigned PSC member to the incident
  submitAssign = () => {
    console.log(this.state.assigning.assigned);
    
    this.props.dispatch({type: 'ADD_ASSIGNED', payload: {assigned: this.state.assigning.assigned, 
                                                        incident: this.state.assigning.incident,
                                                        client_id: this.props.incident.client_id}});
  }

  render() {
    return(
      // displays the assigned PSC member for an incident, or an alert if no one is assigned
      <>
        {this.props.incident.assigned ?
          <h4>This incident is assigned to: {this.props.incident.assigned}</h4>
          :
          <h4 className="alert">This incident is not assigned to anyone.</h4>
        }
        {this.props.combinedReducer != undefined &&
          <>
            <select id="assignClaim" onChange={(event) => this.handleChange(event, this.props.incidentId)}>
            <option key="0">select</option>
            {this.props.combinedReducer.map((person) => {
              return(
                <option key={person.id} value={person.id}>{person.first_name}</option>
              );
            })}
            </select>
            <Button 
              className="internalLine"
              id="confirm"
              variant="primary"
              onClick={this.submitAssign}
            >
            Assign
            </Button>
          </>  
        }
      </>
    )
  }
}

export default connect(mapStoreToProps)(AssignClaimComponent);
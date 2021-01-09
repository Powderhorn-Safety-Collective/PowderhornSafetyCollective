import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';

class AssignClaimComponent extends Component {

  state= {
    assigning: {
      assigned: 0,
      incident: 0,
    },
    activeMemArray: []
  }

  componentDidMount = () => {
    this.populateArray();
  }
  
  // sets local state to an array with all patrolling or oncall members
  populateArray = () => {
    let tempArray = []
    if(this.props.store.patrolReducer !== null) {
      this.props.store.patrolReducer.map((person) => {
      tempArray.push(person)
      });
    }
    this.props.store.onCallReducer.map((oCPerson) => {
      tempArray.push(oCPerson)
    });
    this.setState ({
      ...this.state,
      activeMemArray: tempArray
    });
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
    
    this.props.dispatch({type: 'ADD_ASSIGNED', payload: this.state.assigning});
    // the id is this.state.assigning.assigned, but need the phone number
    let assignedUserData = this.state.activeMemArray.find(user => user.id == this.state.assigning.assigned);
    console.log('assignedUserData', assignedUserData);
    this.props.dispatch({type: 'MAKE_PHONE_MESSAGE_TO_ASSIGNED_USER', payload: {phone: assignedUserData.phone}});
  }

  render() {
    return(
      <>
                  {this.props.incident.assigned ?
                    <h4>This incident is assigned to: {this.props.incident.assigned}</h4>
                    :
                    <h4 className="alert">This incident is not assigned to anyone.</h4>
                  }
      {this.props.store.patrolReducer &&
      <>
        <select id="assignClaim" onChange={(event) => this.handleChange(event, this.props.incidentId)}>
          <option key="0">select</option>
          {this.state.activeMemArray.map((person) => {
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
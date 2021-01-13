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
    console.log('populate array fn');
    
    let tempArray = []
    // if(this.props.patrolReducer !== null) {
    // if(this.props.patrolReducer != undefined) {
    // if(this.props.patrolReducer != null) {
    // // if (this.props.patrolReducer.length > 0) {
    //   this.props.patrolReducer.map((person) => {
    //   tempArray.push(person)
    //   });
    // }
    // if (this.props.onCallReducer.length > 0) {
    //   this.props.onCallReducer.map((oCPerson) => {
    //     tempArray.push(oCPerson)
    //   });
    // }
    // for (let i=0; i < this.props.patrolReducer.length; i++) {
    //   tempArray.push(this.props.patrolReducer[i]);
    // }
    // for(let i=0; i < this.props.onCallReducer.length; i++) {
    //   tempArray.push(this.props.onCallReducer[i]);
    // }
    // console.log('tempArray', tempArray);
    
    // this.setState ({
    //   ...this.state,
    //   activeMemArray: tempArray
    // });
    console.log('patrol', this.props.patrolReducer);
    console.log('call', this.props.onCallReducer);
    
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
    // the id is this.state.assigning.assigned, but need the phone number
    // let assignedUserData = this.state.activeMemArray.find(user => user.id == this.state.assigning.assigned);
    // console.log('assignedUserData', assignedUserData);
    // console.log('assigned incident', this.props.incident.client_id);
    
    // this.props.dispatch({type: 'MAKE_PHONE_MESSAGE_TO_ASSIGNED_USER', payload: {phone: assignedUserData.phone, client_id: this.props.incident.client_id}});
  }

  render() {
    return(
      <>
      {/* {JSON.stringify(this.props.patrolReducer)} */}
      {/* {JSON.stringify(this.props.onCallReducer)} */}
      {/* {JSON.stringify(this.state)} */}
      {JSON.stringify(this.props.combinedReducer)}
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
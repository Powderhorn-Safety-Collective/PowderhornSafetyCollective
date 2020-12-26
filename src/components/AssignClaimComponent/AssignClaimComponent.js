import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AssignClaimComponent extends Component {
  state= {
    assigning: {
      assigned: 0,
      incident: 0,
    },
    activeMemArray: []
  }
  componentDidMount = () => {
    this.populateArray()
  }
  // sets local state to an array with all patrolling or oncall members
  populateArray = () => {
    let tempArray = []
    this.props.store.patrolReducer.map((person) => {
      tempArray.push(person)
      })
    this.props.store.onCallReducer.map((oCPerson) => {
      tempArray.push(oCPerson)
    })
    this.setState ({
      ...this.state,
      activeMemArray: tempArray
    })
  }

  // sets local state to selected PSC member and incident id
  handleChange = (event, param) => {
    this.setState ({
      assigning:{
        assigned: event.target.value,
        incident: param
      }
    })
  }
  // dispatches request to add assigned PSC member to the incident
  submitAssign = () => {
    this.props.dispatch({type: 'ADD_ASSIGNED', payload: this.state.assigning})
  }

  render() {
    return(
      <>
      {this.props.store.patrolReducer &&
      <>
        <select id="assignClaim" onChange={(event) => this.handleChange(event, this.props.incidentId)}>
          <option key="0">select</option>
          {this.state.activeMemArray.map((person) => {
            return(
              <option key={person.id} value={person.id}>{person.first_name}</option>
            )
          })}
        </select>
        <button onClick={this.submitAssign}>Assign/Claim</button>
      </>  
      }
      </>
    )
  }
}

export default connect(mapStoreToProps)(AssignClaimComponent);
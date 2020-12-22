import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AssignClaimComponent extends Component {
  state= {
    assigned: 0,
    activeMemArray: []
  }
  componentDidMount = () => {
    this.populateArray()
  }
  
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

  handleChange = (event, param) => {
    this.setState ({
      assigned: event.target.value
    })
  }

  submitAssign = () => {
    console.log('ASSIGNING*******', this.state.assigned);
    
  }

  render() {
    return(
      <>
      {this.props.store.patrolReducer &&
      <>
        <select id="assignClaim" onChange={(event) => this.handleChange(event)}>
          {this.state.activeMemArray.map((person) => {
            return(
              <option key={person.id} value={person.id}>{person.first_name}</option>
            )
          })}
          <option key="0">select</option>
        </select>
        <button onClick={this.submitAssign}>Assign/Claim</button>
      </>  
      }
      </>
    )
  }
}

export default connect(mapStoreToProps)(AssignClaimComponent);
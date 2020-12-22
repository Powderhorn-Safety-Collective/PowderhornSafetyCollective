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
      console.log("%%%%%%",tempArray);
      })
    this.setState ({
      ...this.state,
      activeMemArray: tempArray
    })
  }

  render() {
    return(
      <>

      {this.props.store.patrolReducer &&
      <>
        <label htmlFor="assignClaim">Assign or Claim</label>
        <select id="assignClaim" onChange={(event) => this.handleChangeFor(event, 'assignedMember')}>
          {this.state.activeMemArray.map((person) => {
            return(
              <option key={person.id} value={person.id}>{person.first_name}</option>
            )
          })}
        </select>
      </>  
      }
      </>
    )
  }
}

export default connect(mapStoreToProps)(AssignClaimComponent);
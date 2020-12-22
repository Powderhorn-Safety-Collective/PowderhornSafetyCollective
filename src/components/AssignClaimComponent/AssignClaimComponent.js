import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AssignClaimComponent extends Component {
  // state= {
  //   assigned: 0,
  //   activeMemArray: []
  // }
  // componentDidMount = () => {
  //   this.populateArray()
  // }
  
  // populateArray = () => {
  //   this.props.store.patrolReducer.map((person) => {
  //     this.setState ({
  //       // ...this.state,
  //       activeMemArray: [...this.state.activeMemArray, person]
  //     })
  //   })
  // }

  render() {
    return(
      <>
      {this.props.store.patrolReducer &&
        <>
        {this.props.store.patrolReducer.map((person) => {
          return <p>{person.first_name}</p>
        })}
        </>
      }
      </>
    )
  }
}

export default connect(mapStoreToProps)(AssignClaimComponent);
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatrolItem extends Component {

  render(){
    return(
      <li key={this.props.patroller.key}>{this.props.patroller.username}</li>
    )
  }
}
const mapStoreToProps = reduxStore => ({
  reduxStore
})

export default connect(mapStoreToProps)(PatrolItem);
import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatrolItem extends Component {

  render(){
    return(
      <li key={this.props.onCall.key}>{this.props.onCall.username}</li>
    )
  }
}
const mapStoreToProps = reduxStore => ({
  reduxStore
})

export default connect(mapStoreToProps)(PatrolItem);
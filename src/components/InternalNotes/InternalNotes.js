import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class InternalNotes extends Component {

  render (){
    return(
      <p>This is an internal Note</p>
    )

  }
}


export default connect(mapStoreToProps)(InternalNotes);
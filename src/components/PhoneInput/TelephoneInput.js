import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhoneInput from 'react-phone-number-input/input'
import mapStoreToProps from '../../redux/mapStoreToProps';


  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  // If `country` property is not passed
  // then "International" format is used.
  // Otherwise, "National" format is used.

  
  class TelephoneInput extends Component {
    state = {
    }
    render() {
      return (
        <div>
          <h2>{this.state.heading}</h2>
          <PhoneInput
            country="US"
            value={this.props.value}
            onChange={(event) => this.props.onChange(event)} 
          />
        </div>
    );
  }
}

export default connect(mapStoreToProps)(TelephoneInput);

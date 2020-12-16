import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ToggleSwitch.scss';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ToggleSwitch extends (Component) {

  render() {
    return(
      <div className="toggle-switch">
        <input type="checkbox"    className="toggle-switch-checkbox"  name={this.props.toggleName}
        id={this.props.toggleName}/>
        <label class="toggle-switch-label" htmlFor={this.props.toggleName}>
          <span class="toggle-switch-inner" data-yes="Yes" data-no="No"></span>
          <span class="toggle-switch-switch"></span>
        </label>
      </div>
    )
  }
}


export default connect(mapStoreToProps)(ToggleSwitch);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './SkillsForm.css';

class SkillsForm extends Component {
  state = {
    checked: this.props.checked
  }


  render() {
    let skill = this.props.skill
    let checked = this.props.checked
    return(
      <div  className="form-check">
        <input
          type="checkbox"
          value={skill.id}
          onChange={this.props.onClick}
          className="form-check-input"
          id={this.props.boxId}  
          />
        <label 
          className="form-check-label"
          for={this.props.boxId}>

            {skill.description}
        </label>
        {/* <button 
          className={this.props.className}
          onClick={this.props.onClick}  
          value={skill.id}
        >
          {skill.description}
        </button> */}
      </div>
    )
  }
}

export default connect(mapStoreToProps)(SkillsForm);
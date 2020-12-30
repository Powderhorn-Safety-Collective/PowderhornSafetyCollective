import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './SkillsForm.css';

class SkillsForm extends Component {


  render() {
    let skill = this.props.skill
    return(
      <>
        <button 
          className={this.props.className}
          onClick={this.props.onClick}  
          value={skill.id}
        >
          {skill.description}
        </button>
      </>
    )
  }
}

export default connect(mapStoreToProps)(SkillsForm);
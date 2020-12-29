import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SkillsForm extends Component {


  render() {
    const skill = this.props.skill
    return(
      <>
      <label key={this.props.key}>
        <input 
          type="checkbox"
          onChange={(event) => this.props.addSkill(event, skill.description) }
          value={skill.id}
        />
        <span>{skill.description}</span>
      </label>
      </>
    )
  }
}

export default connect(mapStoreToProps)(SkillsForm);
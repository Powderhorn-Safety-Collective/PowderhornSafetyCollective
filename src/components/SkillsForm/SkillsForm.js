import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class SkillsForm extends Component {
  componentDidMount = () => {
    this.getSkills();
  }

  getSkills = () => {
    this.props.dispatch({type:'FETCH_ALL_SKILLS'});
  }

  render() {
    return(
      <>
      {this.props.store.allSkillsReducer.map((skill) => {
        return(
          <label>
            <input type="checkbox"/>
            <span>{skill.description}</span>
          </label>

        )
      })}
      </>
    )
  }
}

export default connect(mapStoreToProps)(SkillsForm);
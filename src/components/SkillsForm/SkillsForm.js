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
      <p>THIS IS A SKILLS FORM</p>
    )
  }
}

export default connect(mapStoreToProps)(SkillsForm);
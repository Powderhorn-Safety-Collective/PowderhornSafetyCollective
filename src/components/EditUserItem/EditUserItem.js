import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

class EditUserItem extends Component {

  editUser = (id) => {
    this.props.dispatch( {type: 'EDIT_USER', payload: id} );
    this.props.history.push("/editUserModal");
  }

  // this function grabs all skills tied to a specific user and adds them to an array
  skillsFunction = () => {
    let array = '';
    for(let i = 0; i < this.props.store.skillsReducer.length; i++) {
      if(this.props.store.skillsReducer[i].user_id === this.props.user.id) {
        array= array += `•` + this.props.store.skillsReducer[i].description + '\n';
      }
    }
    return array;
  }
    
  render() {
    return (
        <tr>
            <td>{this.props.user.id}</td>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.first_name}</td>
            <td>{this.props.user.last_name}</td>
            <td>{this.props.user.address}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.phone}</td>
            <td>{this.props.user.adult.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.skillsFunction()}</td>
            <td>{this.props.user.role}</td>
            <td>{this.props.user.on_patrol.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.user.on_call.toString()}</td> {/* toString method to convert boolean to string */}

            {/* trash can row to delete user? */}
            <td className="edit" onClick={() => this.editUser(this.props.user)}><span role="img" aria-labelledby="cute pencil">✏️</span></td>
            <td className="trash"><span role="img" aria-labelledby="trash bin">🗑️ </span></td>
        </tr>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(EditUserItem));

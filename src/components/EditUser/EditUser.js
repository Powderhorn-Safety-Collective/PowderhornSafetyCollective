import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditUserItem from '../EditUserItem/EditUserItem'; // mapped out user data for the table

class EditUser extends Component {

    // GET request is called on page load
    // to retrieve all incident data
    componentDidMount = () => {
        this.getUsers();
        this.getUserSkills();
      }

    // function to fetch all incident data
    getUsers = () => {
        this.props.dispatch( {type: 'GET_ALL_USERS'});
    }

    getUserSkills = () => {
      this.props.dispatch({type: 'FETCH_USER_SKILLS'});
    }

       // below are functions used to sort user table by column
      sortByUsername = () => {
        this.props.dispatch( {type:'SORT_USERNAME'} );
      }
      sortByFirstName = () => {
        this.props.dispatch( {type:'SORT_FIRST_NAME'} );
      }
      sortByLastName = () => {
        this.props.dispatch( {type:'SORT_LAST_NAME'} );
      }
      sortByAddress = () => {
        this.props.dispatch( {type:'SORT_ADDRESS'} );
      }
      sortByEmail = () => {
        this.props.dispatch( {type:'SORT_EMAIL'} );
      }
      sortByPhone = () => {
        this.props.dispatch( {type:'SORT_PHONE'} );
      }
      sortByAdult = () => {
        this.props.dispatch( {type:'SORT_ADULT'} );
      }
      // sortBySkills = () => {
      //   this.props.dispatch({ type: 'SORT_SKILLS'});
      // } THIS NEEDS tweaking because it's a many-many
      sortByRole = () => {
        this.props.dispatch( {type:'SORT_ROLE'} );
      }
      sortByOnPatrol = () => {
        this.props.dispatch( {type:'SORT_ON_PATROL'} );
      }
      sortByOnCall = () => {
        this.props.dispatch( {type:'SORT_ON_CALL'} );
      }
      // end of sorting functions

  render() {
    return (
      <div>
        {/* THIS IS PLACEHOLDER TEXT TO SHOW SYNTAX FOR CONDITIONAL RENDERING OF SKILLS IN THE USERTABLE */}
        {this.props.store.userSkillsReducer.map((skill) => {
          return(
            skill.user_id === 2 &&
            <p>{skill.description}</p>
          )
        })}
        <h2>Edit User Page</h2>
        <table>
                <thead>
                    <tr>
                        <th onClick={this.getUsers}>Id</th>
                        <th onClick={this.sortByUsername}>Username</th>
                        <th onClick={this.sortByFirstName}>First Name</th>
                        <th onClick={this.sortByLastName}>Last name</th>
                        <th onClick={this.sortByAddress}>Address</th>
                        <th onClick={this.sortByEmail}>Email</th>
                        <th onClick={this.sortByPhone}>Phone</th>
                        <th onClick={this.sortByAdult}>Adult</th>
                        <th>Skills</th> 
                        {/* This is the onClick function for sorting the table by skills when it is working onClick={this.sortBySkills} */}
                        <th onClick={this.sortByRole}>Role</th>
                        <th onClick={this.sortByOnPatrol}>On Patrol</th>
                        <th onClick={this.sortByOnCall}>On Call</th>
                        <th onClick={() => this.editUser(this.props.user)}>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map through allUsersReducer data and passing it along to EditUserItem */}
                    {this.props.store.allUsersReducer.map( (user, index) => {
                      const skills = this.props.store.userSkillsReducer.description
                        return(
                            <EditUserItem user={user} key={index} skills={skills}/>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="14"></td>
                    </tr>
                </tfoot>
            </table>
            <br/>  
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUser);


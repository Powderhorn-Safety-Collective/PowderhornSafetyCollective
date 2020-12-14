import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import RegisterForm from '../RegisterForm/RegisterForm';

// Community Page component
// visible to everyone
class CommunityPage extends Component {
  state = {
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div>
        <h2>This is the Community Page</h2>
        <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(CommunityPage);

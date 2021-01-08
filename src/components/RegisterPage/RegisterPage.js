import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from 'react-bootstrap/Button';
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {

  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterForm />
        <center>
          <Button
            variant="primary"
            type="button"
            className="btn "
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);

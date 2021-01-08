import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';
import Button from 'react-bootstrap/Button';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        <center>
          <h4>New to PSC?</h4>
          <Button
            variant="primary"
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);

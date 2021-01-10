import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {useHistory} from 'react-router-dom';

  const Nav = (props) => {
  const history = useHistory();

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.role === 1 || props.store.user.role === 0) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'My Dashboard';
  } else if (props.store.user.role === 2) {
    loginLinkData.path = '/member';
    loginLinkData.text = 'My Dashboard';
  } else if (props.store.user.role === 3) {
    loginLinkData.path = '/admin';
    loginLinkData.text = 'Dashboard';
    return (     
      <>
    <div className="dropdown-nav">
    <button className="dropbtn-nav">Welcome to PSC!</button>
    <div className="dropdown-content-nav">
    <a><Link className="nav-link" to={loginLinkData.path}>
          {loginLinkData.text}</Link></a>
     <a><Link className="nav-link" to="/community"> Community Page</Link></a>
    <a><Link className="nav-link" to="/history">Incident Table</Link> </a>
    <a><Link className="nav-link" to="/edit">User Table</Link></a>
    {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <a><LogOutButton className="nav-link" history={history} /></a>
          </>
        )}
    </div>
    </div>
    </>
    );
  }

  return (
    <div className="dropdown-nav">
    <button className="dropbtn-nav">Welcome to PSC!</button>
    <div className="dropdown-content-nav">
        <a><Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
          </Link></a>
          {/* Always show this link since the about page is not protected */}
          {/* Changed the route to be the future community page route */}
          <a><Link className="nav-link"  to="/community">
            Community Page
          </Link></a>
          {/* <Link className="nav-link" to="/history">Incident History</Link> */}
          {/* <Link className="nav-link" to="/edit">Edit User</Link> */}
         {/* Show the link to the info page and the logout button if the user is logged in */}
         {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <a><LogOutButton className="nav-link" /></a>
          </>
        )}
      </div>
      </div>
  );
};

export default connect(mapStoreToProps)(Nav);

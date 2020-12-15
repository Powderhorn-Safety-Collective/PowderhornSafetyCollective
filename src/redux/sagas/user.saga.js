import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// function to grab all user data, rather than just the logged in user
function* getAllUsers() {
  try {
    const response = yield axios.get('/api/user/all'); // /all to grab all user data
    console.log(response.data);
    yield put ( {type:'SET_ALL_USERS', payload: response.data} );
  } catch (error) {
    console.log(error);
  }
}

// below are the functions used to sort the incident table by column
function* sortUsername() {
  try {
      const response = yield axios.get('/api/user/username');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortFirstName() {
  try {
      const response = yield axios.get('/api/user/first');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortLastName() {
  try {
      const response = yield axios.get('/api/user/last');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortAddress() {
  try {
      const response = yield axios.get('/api/user/address');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortEmail() {
  try {
      const response = yield axios.get('/api/user/email');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortPhone() {
  try {
      const response = yield axios.get('/api/user/phone');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortAdult() {
  try {
      const response = yield axios.get('/api/user/adult');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortOnPatrol() {
  try {
      const response = yield axios.get('/api/user/patrol');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}
function* sortOnCall() {
  try {
      const response = yield axios.get('/api/user/oncall');
      yield put ( {type:'SET_ALL_USERS', payload: response.data} );
    } catch (error) {
      console.log(error);
    }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('GET_ALL_USERS', getAllUsers); // yield to grab all users from database, as opposed to the single user data that the above yield grabs

      // below are all the yields to sort data table by column
      yield takeLatest("SORT_USERNAME", sortUsername);
      yield takeLatest("SORT_FIRST_NAME", sortFirstName);
      yield takeLatest("SORT_LAST_NAME", sortLastName);
      yield takeLatest("SORT_ADDRESS", sortAddress);
      yield takeLatest("SORT_EMAIL", sortEmail);
      yield takeLatest("SORT_PHONE", sortPhone);
      yield takeLatest("SORT_ADULT", sortAdult);
      yield takeLatest("SORT_ON_PATROL", sortOnPatrol);
      yield takeLatest("SORT_ON_CALL", sortOnCall);
}

export default userSaga;

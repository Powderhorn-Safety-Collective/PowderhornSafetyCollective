import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

// saga function for toggling the state of the boolean for 'on patrol' for the user
function* addPStatus(action) {
  console.log('action.payload', action.payload);
  
  try{
    yield axios.put('api/patrol/status', action.payload);
    yield put({type: 'FETCH_USER'});
    yield put({type: 'FETCH_PATROL'});
    
  }catch(error) {
    console.log('error in edit patrolstatus');
  }
}

// saga function for toggling the state of the boolean for 'on call' for the user
function* addCStatus(action){
  try{
    yield axios.put('api/oncall/status', action.payload);
    yield put({type: 'FETCH_USER'});
    yield put({type: 'FETCH_ONCALL'});
  }catch(error) {
    console.log('error in edit patrolstatus');
  }
}

function* fetchPatrol() {
  try{
    const patrol = yield axios.get('/api/patrol');
    yield console.log('THE COUNT IS', patrol.data)
    yield put({type: 'SET_PATROL', payload: patrol.data});
  }catch(error){
    console.log('error in fetch patrol', error); 
  }
}

function* fetchOnCall() {
  try{
    const onCallCount = yield axios.get('/api/oncall');
    yield console.log('THE PEOPLE ON CALL', onCallCount.data)
    yield put({type: 'SET_ONCALL', payload: onCallCount.data});
  }catch(error){
    console.log('error in fetch oncall', error); 
  }
}

function* makePhoneMessageForNewIncident(action) {
  try {

    console.log('on call patrol phone number', action.payload);
    yield axios.post('api/message/newIncident', action.payload);
  }
  catch(error) {
    console.log('error in update text send');
    
  }
}

function* statusSaga() {
  yield takeEvery('ADD_CALL_STATUS', addCStatus);
  yield takeEvery('ADD_PATROL_STATUS', addPStatus);
  yield takeEvery('FETCH_ONCALL', fetchOnCall);
  yield takeEvery('FETCH_PATROL', fetchPatrol);
  yield takeEvery('MAKE_PHONE_MESSAGE_FOR_NEW_INCIDENT', makePhoneMessageForNewIncident);
}

export default statusSaga;
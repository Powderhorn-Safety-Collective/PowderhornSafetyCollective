import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

// saga function for toggling the state of the boolean for 'on patrol' for the user
function* addPStatus(action) {
  console.log('action.payload', action.payload);
  
  try{
    yield axios.put('api/patrol/status', action.payload);
    yield put({type: 'FETCH_USER'});
    yield put({type: 'FETCH_PATROL'});
    yield put({type: 'FETCH_PATROL_CALL'});
    yield put({type: 'GET_ON_CALL_COUNT'});
    yield put({type: 'GET_PATROL_COUNT'});
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
    yield put({type: 'FETCH_PATROL_CALL'});
    yield put({type: 'GET_ON_CALL_COUNT'});
    yield put({type: 'GET_PATROL_COUNT'});
    
  }catch(error) {
    console.log('error in edit patrolstatus');
  }
}
// fetch the users who are on patrol
function* fetchPatrol() {
  try{
    const patrol = yield axios.get('/api/patrol');
    yield console.log('THE COUNT IS', patrol.data)
    yield put({type: 'SET_PATROL', payload: patrol.data});
  }catch(error){
    console.log('error in fetch patrol', error); 
  }
}

// this one gets the number of people on patrol
function* getPatrolCount() {
  try {
    console.log('getPatrolCount saga');
    const patrolCount = yield axios.get('api/patrol/count');
    console.log('patrolCount', patrolCount);
    yield put({type: 'SET_PATROL_COUNT', payload: patrolCount.data});
  }
  catch (error) {
    console.log('error in getPatrolCount function', error);
    
  }
}

// This function gets the number of people on call
function* getOnCallCount() {
  try {
    console.log('getOnCall');
    const onCallCount = yield axios.get('api/oncall/count');
    console.log('onCallCount', onCallCount.data);
    yield put({type: 'SET_ON_CALL_COUNT', payload: onCallCount.data});
    
  }
  catch (error) {
    console.log('error in getOnCallCount fn', error);
    
  }
}
// fetches the users who are on call
function* fetchOnCall() {
  try{
    const onCallCount = yield axios.get('/api/oncall');
    yield console.log('THE PEOPLE ON CALL', onCallCount.data)
    yield put({type: 'SET_ONCALL', payload: onCallCount.data});
  }catch(error){
    console.log('error in fetch oncall', error); 
  }
}
// notifies members of new incidents
function* makePhoneMessageForNewIncident(action) {
  try {

    console.log('on call patrol phone number', action.payload);
    yield axios.post('api/message/newIncident', action.payload);
  }
  catch(error) {
    console.log('error in update text send');
    
  }
}

// fetches all users on patrol or on call
function* fetchPatrolCall() {
  try {
    const patrolCallResponse = yield axios.get('api/patrol/patrolCall');
    console.log('pcResponse', patrolCallResponse.data);
    yield put({type: 'SET_PATROL_CALL', payload: patrolCallResponse.data});
  }
  catch (error) {
    console.log('error in fetchPatrolCall saga', error);
    
  }
}

function* statusSaga() {
  yield takeEvery('ADD_CALL_STATUS', addCStatus);
  yield takeEvery('ADD_PATROL_STATUS', addPStatus);
  yield takeEvery('FETCH_ONCALL', fetchOnCall);
  yield takeEvery('GET_PATROL_COUNT', getPatrolCount);
  yield takeEvery('FETCH_PATROL', fetchPatrol);
  yield takeEvery('MAKE_PHONE_MESSAGE_FOR_NEW_INCIDENT', makePhoneMessageForNewIncident);
  yield takeEvery('FETCH_PATROL_CALL', fetchPatrolCall);
  yield takeEvery('GET_ON_CALL_COUNT', getOnCallCount);
}

export default statusSaga;
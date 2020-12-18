import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* addPStatus(action) {
  try{
    yield axios.put('api/patrol/status', action.payload);
    yield put({type: 'FETCH_PATROL'});
  }catch(error) {
    console.log('error in edit patrolstatus');
    
  }
}

function* addCStatus(action){
  try{
    yield axios.put('api/oncall/status', action.payload);
    yield put({type: 'FETCH_ONCALL'})
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


function* statusSaga() {
  yield takeEvery('ADD_CALL_STATUS', addCStatus);
  yield takeEvery('ADD_PATROL_STATUS', addPStatus);
  yield takeEvery('FETCH_ONCALL', fetchOnCall);
  yield takeEvery('FETCH_PATROL', fetchPatrol);
}


export default statusSaga;
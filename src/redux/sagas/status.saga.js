import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* addPStatus(action) {
  try{
    yield axios.put('api/patrol/status', action.payload);
  }catch(error) {
    console.log('error in edit patrolstatus');
    
  }
}

function* addCStatus(action){
  try{
    yield axios.put('api/oncall/status', action.payload);
  }catch(error) {
    console.log('error in edit patrolstatus');
  }
}


function* statusSaga() {
  yield takeEvery('ADD_CALL_STATUS', addCStatus);
  yield takeEvery('ADD_PATROL_STATUS', addPStatus)
}


export default statusSaga;
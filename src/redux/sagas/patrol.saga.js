import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* fetchPatrolCount() {
  try{
    const patrolCount = yield axios.get('/api/patrol');
    yield console.log('THE COUNT IS', patrolCount.data[0].on_patrol)
    yield put({type: 'SET_PATROL_COUNT', payload: patrolCount.data[0].on_patrol});
  }catch(error){
    console.log('error in fetch patrol count', error); 
  }
}


function* patrolSaga() {
  yield takeEvery('FETCH_PATROL_COUNT', fetchPatrolCount);
}


export default patrolSaga;
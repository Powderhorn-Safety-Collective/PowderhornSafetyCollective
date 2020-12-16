import axios from 'axios';
import {put, takeEvery } from 'redux-saga/effects';

function* addStatus(action) {
  console.log('ADDING STATUS', action.payload);
}


function* onCallSaga() {
  yield takeEvery('ADD_STATUS', addStatus);
}


export default onCallSaga;
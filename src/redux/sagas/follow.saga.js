import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// this saga function is to add the user to the junction table incident_followers
// to allow users to follow updates on an incident
function* followIncidentSaga(action) {
  console.log('in follow incident with incident id', action.payload);
  yield axios.post('api/incident/follow', action.payload);
  yield put({type: 'GET_FOLLOWED_INCIDENTS'});
  yield put({type: 'GET_PERSONAL_INCIDENTS'});
} 

// this saga function is to remove the user from the junction table incident_followers
// to allow them to stop receiving updates on that incident
function* unfollowIncidentSaga(action) {
  console.log('in unfollow incident with incident id', action.payload);
  yield axios.delete(`api/incident/follow/${action.payload.incident_Id}`);
  yield put({type: 'GET_FOLLOWED_INCIDENTS'});
  yield put({type: 'GET_PERSONAL_INCIDENTS'});
} 

// function* getFollowersForIncidents(action) {
//   console.log('in get followers');
//   const followersResponse = yield axios.get(`api/incident/followers`);
//   console.log('followersResponse.data in saga', followersResponse.data);
//   yield put({type:'SET_FOLLOWERS_FOR_INCIDENTS', payload: followersResponse.data});
// }

function* makePhoneMessageUpdate(action) {
  try {
    console.log('update to follower phone number', action.payload);
    yield axios.post('api/message/update', action.payload);
  }
  catch (error) {
    console.log('error in send message for update to followers');
    
  }
}

function* followSaga() {
  yield takeEvery('FOLLOW_INCIDENT', followIncidentSaga); 
  yield takeEvery('UNFOLLOW_INCIDENT', unfollowIncidentSaga); 
  // yield takeEvery('GET_FOLLOWERS_FOR_INCIDENTS', getFollowersForIncidents);
  yield takeEvery('MAKE_PHONE_MESSAGE_TO_FOLLOWER_FOR_UPDATE', makePhoneMessageUpdate)
}

export default followSaga;
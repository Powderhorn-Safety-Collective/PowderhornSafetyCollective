import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';

// function to fetch all the rows from the user_skills table in the DB
function* fetchUserSkills() {
  try{
    const skillsResults = yield axios.get('/api/skills/user');
    yield put ({type: 'SET_USER_SKILLS', payload: skillsResults.data})
  }catch(error) {
    console.log('error in fetch skills', error);
  }
}

// function to fetch ALL possible skills from skills table
function * fetchAllSkills() {
  try{
    const results = yield axios.get('/api/skills');
    yield console.log('ALL THE SKILLS ARE', results.data);
    yield put ({type: 'SET_ALL_SKILLS', payload: results.data})
  }catch(error) {
    console.log('Error is fetching all skills');
  }
}

// adds a new row to the user_skills table
function* addSkill(action) {
  try{
    yield axios.post('/api/skills/user', action.payload);
  }catch(error) {
    console.log('error adding new userskill', error);
  }
}

// removes a user's skill from the user_skill saga
function* removeSkill(action) {
  console.log(action.payload, 'skill remove');
  try{
    yield axios.delete(`api/skills/user/${action.payload.userId}/${action.payload.skillId}`);
  }catch(error) {
    console.log('error removing userskill', error);
  }
}

function* skillsSaga(){
  yield takeEvery('FETCH_USER_SKILLS', fetchUserSkills);
  yield takeEvery('FETCH_ALL_SKILLS', fetchAllSkills);
  yield takeEvery('ADD_SKILL', addSkill);
  yield takeEvery('REMOVE_SKILL', removeSkill);
}

export default skillsSaga;
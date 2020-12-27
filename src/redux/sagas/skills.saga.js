import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';


// function to fetch all the rows from the user_skills table in the DB
function* fetchSkills() {
  try{
    const skillsResults = yield axios.get('/api/skills');
    yield console.log('ALL THE USERS SKILLS ARE', skillsResults);
  }catch(error) {
    console.log('error in fetch skills', error);
    
  }
}


function* skillsSaga(){
  yield takeEvery('FETCH_SKILLS', fetchSkills);
}
export default skillsSaga;
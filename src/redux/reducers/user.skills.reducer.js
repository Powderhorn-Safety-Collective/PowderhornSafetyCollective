// holds all the user and skill data from the user_skill table
const userSkillsReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_USER_SKILLS':
      return action.payload;
    default: 
      return state;
  }
}

export default userSkillsReducer
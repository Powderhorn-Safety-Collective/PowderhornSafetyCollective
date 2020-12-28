const userSkillsReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_USER_SKILLS':
      return action.payload;
    default: 
      return state;
  }
}

export default userSkillsReducer
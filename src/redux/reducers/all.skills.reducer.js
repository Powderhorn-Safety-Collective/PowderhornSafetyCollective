const allSkillsReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_ALL_SKILLS':
      return action.payload;
    default: 
      return state;
  }
}

export default allSkillsReducer
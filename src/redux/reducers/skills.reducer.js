const skillsReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_SKILLS':
      return action.payload;
    default: 
      return state;
  }
}

export default skillsReducer
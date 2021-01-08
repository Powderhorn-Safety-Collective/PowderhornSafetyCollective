// holds a list of all the skills in the skills table
const followedIncidentsReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_FOLLOWED_INCIDENTS':
      return action.payload;
    default: 
      return state;
  }
}

export default followedIncidentsReducer;
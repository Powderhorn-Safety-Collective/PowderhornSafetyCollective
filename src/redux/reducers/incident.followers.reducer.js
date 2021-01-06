

const incidentFollowersReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_FOLLOWERS_FOR_INCIDENTS':
      return action.payload;
    default: 
      return state;
  }
}

export default incidentFollowersReducer;
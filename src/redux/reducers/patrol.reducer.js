const patrolReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_PATROL':
      return action.payload;
    default:
      return state;
  }
}

export default patrolReducer;
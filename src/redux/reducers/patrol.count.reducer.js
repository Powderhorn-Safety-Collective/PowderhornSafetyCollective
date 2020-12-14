const patrolCountReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_PATROL_COUNT':
      return action.payload;
    default:
      return state;
  }
}

export default patrolCountReducer;
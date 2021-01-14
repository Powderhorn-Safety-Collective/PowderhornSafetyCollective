// holds data for on call and on patrol members
const combinedPatrolCallReducer = (state= [], action) => {
  switch (action.type) {
    case 'SET_PATROL_CALL':
      return action.payload;
    default: 
      return state;
  }
}

export default combinedPatrolCallReducer;
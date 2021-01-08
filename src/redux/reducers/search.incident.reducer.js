// this reducer stores the search results from SQL
const searchIncidentReducer = (state={}, action) => {
  switch(action.type) {
      case 'SET_SEARCHED_INCIDENT':
          return action.payload;
      default: return state;
  }
}

export default searchIncidentReducer;
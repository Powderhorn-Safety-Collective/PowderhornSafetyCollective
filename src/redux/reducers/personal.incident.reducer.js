// this reducer stores incidents submitted or followed by user
const personalIncidentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PERSONAL_INCIDENTS':
      return action.payload;
    default:
      return state;
  }
}

export default personalIncidentReducer;
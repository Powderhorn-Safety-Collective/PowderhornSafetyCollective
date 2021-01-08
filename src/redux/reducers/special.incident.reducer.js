// this reducer stores the client_id of an incident that was created by an unregistered user who registers during the report-incident flow.
const specialIncidentReducer= (state=0, action) => {
  switch(action.type) {
      case 'SPECIAL_INCIDENT':
        return action.payload;
      case 'UNSET_SPECIAL_INCIDENT':
        return state=0;
      default: return state;
  }
}

export default specialIncidentReducer;
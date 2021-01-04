import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

class IncidentHistoryItem extends Component {

  editIncident = (id) => {
    this.props.dispatch( {type: 'EDIT_INCIDENT', payload: id} );
    this.props.history.push("/editIncidentModal");
  }

  // this function grabs all notes tied to specific incident and throws them into an array
  notesFunction = () => {
    let array = '';
    for(let i = 0; i < this.props.store.internalNoteReducer.length; i++) {
      if(this.props.store.internalNoteReducer[i].incident_id === this.props.incident.id) { // check to match incident_id with incident.id lol
        array = array += `•` + this.props.store.internalNoteReducer[i].text + '\n'; // added bullet point and line break at end for visibility
      }
    }
    return array;
  }
  
  // function to render time associated with incident
  renderTime = (time) => {
    let timeHour = Number(time.slice(11,13));
    console.log('timeHour', timeHour);
    
    let timeMorningEvening = 'a.m.';
    if (timeHour == 12) {
      timeMorningEvening = 'p.m.';
    }
    else if (timeHour == 0) {
      timeHour = 12;
    }
    else if (timeHour > 12) {
      timeHour -= 12;
      timeMorningEvening = 'p.m.';
    }
    let timeMinute = time.slice(14, 16);
    let month = Number(time.slice(5,7));
    let day = Number(time.slice(8,10));
    let year = Number(time.slice(0,4));
    let displayTime = timeHour + ':' + timeMinute + ' ' + timeMorningEvening + ' ' + month + '/' + day + '/' + year;
    return <p>{displayTime}</p>
    
  }
    
  render() {
    return (
        // table displaying all incident data from all users
        <tr>
            <td>{this.props.incident.client_id}</td>
            <td>{this.props.incident.type}</td>
            <td>{this.props.incident.notes}</td>
            <td>{this.props.incident.location}</td>
            {this.renderTime(this.props.incident.time_submitted)} {/* This calls the function to print the time for the incident */}
            <td>{this.props.incident.active.toString()}</td>
            <td>{this.props.incident.view_publicly.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.notesFunction()}</td>
            <td>{this.props.incident.duplicate_entry.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.incident.username}</td> {/* Fix this line*/}

            {/* trash can row to delete incident? */}
            <td className="edit" onClick={() => this.editIncident(this.props.incident)}><span role="img" aria-labelledby="cute pencil">✏️</span></td>
            <td className="trash"><span role="img" aria-labelledby="trash bin">🗑️</span></td>
        </tr>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(IncidentHistoryItem));


// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// });

// function createData(client_id, type, notes, location, time_submitted) {
//   return {
//     client_id,
//     type,
//     notes,
//     location,
//     time_submitted,
//     history: [
//       { active: this.props.incident.active, 
//         public: this.props.incident.view_publicly, 
//         notes: this.notesFunction(), 
//         duplicate: this.props.incident.duplicate_entry, 
//         submitted_by: this.props.incident.username, 
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);
//   const classes = useRowStyles();

//   return (
//     <React.Fragment>
//       <TableRow className={classes.root}>
//         <TableCell>
//           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.client_id}
//         </TableCell>
//         <TableCell align="right">{row.type}</TableCell>
//         <TableCell align="right">{row.notes}</TableCell>
//         <TableCell align="right">{row.location}</TableCell>
//         <TableCell align="right">{row.time_submitted}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Active Incident?</TableCell>
//                     <TableCell>Viewable to Public?</TableCell>
//                     <TableCell>Initial Notes</TableCell>
//                     <TableCell>Duplicate Entry?</TableCell>
//                     <TableCell>Reported by Username</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.active}
//                       </TableCell>
//                       <TableCell>{historyRow.public}</TableCell>
//                       <TableCell>{historyRow.internal_notes}</TableCell>
//                       <TableCell>
//                         {historyRow.duplicate}
//                       </TableCell>
//                       <TableCell>
//                         {historyRow.submitted_by}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         duplicate: PropTypes.bool.isRequired, 
//         internal_notes: PropTypes.string.isRequired,
//         public: PropTypes.bool.isRequired,
//         submitted_by: PropTypes.string.isRequired,
//       }),
//       ).isRequired,    
//     client_id: PropTypes.number.isRequired,
//     location: PropTypes.string.isRequired,
//     notes: PropTypes.string.isRequired,
//     time_submitted: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData(
//     this.props.incident.client_id, 
//     this.props.incident.type, 
//     this.props.incident.notes, 
//     this.props.incident.location, 
//     this.renderTime(this.props.incident.time_submitted), 
//     ),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Incident&nbsp;ID</TableCell>
//             <TableCell align="right">Incident&nbsp;Type</TableCell>
//             <TableCell align="right">Reported Notes</TableCell>
//             <TableCell align="right">Incident Location</TableCell>
//             <TableCell align="right">Time Submitted</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

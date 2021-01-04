import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// function createData(client_id, type, notes, location, time_submitted) {
//   return {
//     client_id,
//     type,
//     notes,
//     location,
//     time_submitted,
//     // history: [
//     //   { active: , 
//     //     public: this.props.incident.view_publicly, 
//     //     internal_notes: this.notesFunction(), 
//     //     duplicate: this.props.incident.duplicate_entry, 
//     //     submitted_by: this.props.incident.username, 
//     //   },
//     // ],
//     history: [
//         { active: 'No', 
//           public: 'Yes',  
//           internal_notes: 'Unknown',  
//           duplicate: 'No',  
//           submitted_by: 'Franz',  
//         },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
        {console.log('callDataMini', props)}
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.client_id}
        </TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.notes}</TableCell>
        <TableCell align="right">{row.location}</TableCell>
        <TableCell align="right">{row.time_submitted}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Incident Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Active Incident?</TableCell>
                    <TableCell>Viewable to Public?</TableCell>
                    {/* <TableCell>Internal Notes</TableCell> */}
                    <TableCell>Duplicate Entry?</TableCell>
                    <TableCell>Reported by Username</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.active.toString()}
                      </TableCell>
                      <TableCell>{row.view_publicly.toString()}</TableCell>
                      {/* <TableCell>{row.internal_notes}</TableCell> */}
                      <TableCell>
                        {row.duplicate_entry.toString()}
                      </TableCell>
                      <TableCell>
                        {row.username}
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     // history: PropTypes.arrayOf(
//     //   PropTypes.shape({
//     //     amount: PropTypes.number.isRequired,
//     //     duplicate: PropTypes.bool.isRequired, 
//     //     internal_notes: PropTypes.string.isRequired,
//     //     public: PropTypes.bool.isRequired,
//     //     submitted_by: PropTypes.string.isRequired,
//     //   }),
//     //   ).isRequired,
//     active: PropTypes.bool,  
//     duplicate: PropTypes.bool,
//     internal_notes: PropTypes.string,
//     public: PropTypes.bool,
//     submitted_by: PropTypes.string,  
//     client_id: PropTypes.number,
//     location: PropTypes.string,
//     notes: PropTypes.string,
//     time_submitted: PropTypes.string,
//     type: PropTypes.string,
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
//   createData(491729, 'Lost Dog', 'Missing dog, running around barking.', 'Powderhorn Park', 'Noon, yesterday.'),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
        {console.log('callData', props)}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Incident&nbsp;ID</TableCell>
            <TableCell align="right">Incident&nbsp;Type</TableCell>
            <TableCell align="right">Reported Notes</TableCell>
            <TableCell align="right">Incident Location</TableCell>
            <TableCell align="right">Time Submitted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.incident.map((props) => (
            <Row key={props.id} row={props} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

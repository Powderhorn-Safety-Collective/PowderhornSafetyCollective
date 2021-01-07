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
import { useDispatch } from 'react-redux';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function renderTime(time) {
  let timeHour = Number(time.slice(11,13));

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className="dropdowndata">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="dropdowndata" component="th" scope="row">
          {row.client_id}
        </TableCell>
        <TableCell className="dropdowndata" align="right">{row.type}</TableCell>
        <TableCell className="dropdowndata" align="right">{row.notes}</TableCell>
        <TableCell className="dropdowndata" align="right">{row.location}</TableCell>
        <TableCell className="dropdowndata" align="right">{renderTime(row.time_submitted)}</TableCell>
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
                  <TableRow className="dropdown">
                    <TableCell>Active Incident?</TableCell>
                    <TableCell>Viewable to Public?</TableCell>
                    {/* <TableCell>Internal Notes</TableCell> */}
                    <TableCell>Duplicate Entry?</TableCell>
                    <TableCell>Reported by Username</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className="dropdowndata" key={row.id}>
                    <TableCell component="th" scope="row">
                        <label>
                          <input 
                            type="radio" 
                            name="active" 
                            value="true" 
                            defaultChecked={row.active === true} 
                            onClick={() => dispatch({ type: 'EDIT_ACTIVE', payload: !row.active, id: row.id})}>
                          </input> True</label>
                        <br/>
                        <label>
                          <input 
                            type="radio" 
                            name="active" 
                            value="false" 
                            defaultChecked={row.active === false} 
                            onClick={() => dispatch({ type: 'EDIT_ACTIVE', payload: !row.active, id: row.id})}>
                          </input> False</label>
                      </TableCell>
                      <TableCell>
                        <label>
                          <input 
                            type="radio" 
                            name="view_publicly" 
                            defaultChecked={row.view_publicly === true} 
                            onClick={() => dispatch({ type: 'EDIT_PUBLIC', payload: !row.view_publicly, id: row.id})}>
                          </input> True</label>
                        <br/>
                        <label>
                          <input 
                            type="radio" 
                            name="view_publicly" 
                            defaultChecked={row.view_publicly === false} 
                            onClick={() => dispatch({ type: 'EDIT_PUBLIC', payload: !row.view_publicly, id: row.id})}>
                          </input> False</label>
                      </TableCell>
                      {/* <TableCell>{row.internal_notes}</TableCell> */}
                      <TableCell>
                        <label>
                          <input 
                            type="radio" 
                            name="duplicate_entry" 
                            defaultChecked={row.duplicate_entry === true} 
                            onClick={() => dispatch({ type: 'EDIT_DUPLICATE', payload: !row.duplicate_entry, id: row.id})}>
                          </input> True</label>
                        <br/>
                        <label>
                          <input 
                            type="radio" 
                            name="duplicate_entry" 
                            defaultChecked={row.duplicate_entry === false} 
                            onClick={() => dispatch({ type: 'EDIT_DUPLICATE', payload: !row.duplicate_entry, id: row.id})}>
                          </input> False</label>
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

export default function CollapsibleTable(props) {
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
        {console.log('callData', props)}
      <Table className="blackdrop" aria-label="collapsible table">
        <TableHead>
          <TableRow className="dropdown">
            <TableCell />
            <TableCell onClick={() => dispatch( {type: 'SORT_CLIENT'})}>Incident&nbsp;ID</TableCell>
            <TableCell onClick={() => dispatch( {type: 'SORT_TYPE'})} align="right">Incident&nbsp;Type</TableCell>
            <TableCell onClick={() => dispatch( {type: 'SORT_NOTES'})} align="right">Reported Notes</TableCell>
            <TableCell onClick={() => dispatch( {type: 'SORT_LOCATION'})} align="right">Incident Location</TableCell>
            <TableCell onClick={() => dispatch( {type: 'SORT_TIME'})} align="right">Time Submitted</TableCell>
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

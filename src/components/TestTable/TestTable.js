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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function sortByClient() {
    this.props.dispatch( {type:'SORT_CLIENT'} );
    console.log('HELLO!');
  }

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
        <TableCell component="th" scope="row" onClick={() => sortByClient()}>
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
                        <input defaultValue={row.active.toString()} placeholder={row.active.toString()}></input>
                      </TableCell>
                      <TableCell>
                      <input defaultValue={row.view_publicly.toString()} placeholder={row.view_publicly.toString()}></input>
                      </TableCell>
                      {/* <TableCell>{row.internal_notes}</TableCell> */}
                      <TableCell>
                      <input defaultValue={row.duplicate_entry.toString()} placeholder={row.duplicate_entry.toString()}></input>
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

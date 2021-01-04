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
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// function editUser(id) {
//     props.dispatch( {type: 'EDIT_USER', payload: id} );
//     props.history.push("/editUserModal");
//   }



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const history = useHistory();
  const dispatch = useDispatch();

function handleClick(row) {
    console.log('WHAT?!');
    history.push("/editUserModal");
    dispatch( {type: 'EDIT_USER', payload: row} );
}
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
          {row.username}
        </TableCell>
        <TableCell align="right">{row.first_name}</TableCell>
        <TableCell align="right">{row.last_name}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
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
                    <TableCell>Is the user an adult?</TableCell>
                    {/* <TableCell>Internal Notes</TableCell> */}
                    <TableCell>Is the user on patrol?</TableCell>
                    <TableCell>Is the user on call?</TableCell>
                    <TableCell>Edit User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                        <p>
                          {row.adult.toString()}
                        </p>
                      </TableCell>
                      {/* <TableCell>{row.internal_notes}</TableCell> */}
                      <TableCell>
                        <p>
                            {row.on_patrol.toString()}
                        </p>
                      </TableCell>
                      <TableCell>
                          <p>
                             {row.on_call.toString()} 
                          </p>
                      </TableCell>
                      <TableCell>
                        <p onClick={() => handleClick(row)}>
                            Click Me!
                        </p>
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

export default function EditUserTABLE(props) {
  return (
    <TableContainer component={Paper}>
        {console.log('callData', props)}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell align="right">First&nbsp;Name</TableCell>
            <TableCell align="right">Last&nbsp;Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.user.map((props) => (
            <Row key={props.id} row={props} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

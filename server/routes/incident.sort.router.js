const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// below are all the query functions to sort the incident table by column
// route for getting incidents sorted by client id
router.get('/client_id', rejectUnauthenticated, (req, res) => {
  if (Number(req.user.role) === 3) {
    // sort by client_id
    // const queryText = `select * from incidents order by client_id;`;
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "client_id";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});


// route for getting incidents sorted by type  
router.get('/type', rejectUnauthenticated, (req, res) => {
  console.log('hello sort type');
  if (Number(req.user.role) === 3) {
    // sort by type
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "type";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by notes
router.get('/notes', rejectUnauthenticated, (req, res) => {
  if(Number(req.user.role) ===3) {
    // sort by notes
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "notes";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    }); 
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by location
router.get('/location', rejectUnauthenticated, (req, res) => {
  if (Number(req.user.role) === 3) {
    // sort by notes
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "location";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// route for getting incidents sorted by time
router.get('/time_submitted', rejectUnauthenticated, (req, res) => {
  if (Number(req.user.role) ===3) {
    // sort by time_submitted
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "time_submitted" desc;`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by active status
router.get('/status', rejectUnauthenticated, (req, res) => {
  if (Number(req.user.role) ===3) {
    // sort by status
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "active" desc;`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by view_publicly
router.get('/view_publicly', rejectUnauthenticated, (req, res) => {
  if (Number(req.user.role) ===3) {
    // sort by view_publicly
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, type, user_notes_public, username, username_public, view_publicly
    FROM "incidents" ORDER BY "view_publicly";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by responder notes
router.get('/responder_notes', rejectUnauthenticated, (req, res) => {
  if (req.user.role === 3) {
    // sort by responder_notes
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
      text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
      timedate_public, type, user_notes_public, username, username_public, view_publicly
      FROM "incidents" ORDER BY "responder_notes";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by duplicate_entry
router.get('/duplicate_entry', rejectUnauthenticated, (req, res) => {
  if(Number(req.user.role) ===3) {
    // sort by duplicate_entry
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
      text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
      timedate_public, type, user_notes_public, username, username_public, view_publicly
      FROM "incidents" ORDER BY "duplicate_entry";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});
// route for getting incidents sorted by submitted_user
router.get('/submitted_user', rejectUnauthenticated, (req, res) => {
  if(Number(req.user.role) ===3) {
    // sort by user who submitted incident
    const queryText = `SELECT active, client_id, duplicate_entry, id, location, location_public, notes, submitted_user,
      text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
      timedate_public, type, user_notes_public, username, username_public, view_publicly
      FROM "incidents" ORDER BY "username";`;
    pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// end of table sorting routes


module.exports = router;
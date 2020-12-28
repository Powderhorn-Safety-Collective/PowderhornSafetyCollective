const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // below are all the query functions to sort the incident table by column
  router.get('/client_id', rejectUnauthenticated, (req, res) => {
    if (req.user.role == 3) {
      // sort by client_id
      const queryText = `SELECT * FROM "incidents" ORDER BY "client_id";`
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
router.get('/type', rejectUnauthenticated, (req, res) => {
  console.log('hello sort type');
  if (req.user.role == 3) {
    // sort by type
    const queryText = `SELECT * FROM "incidents" ORDER BY "type";`
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
router.get('/notes', rejectUnauthenticated, (req, res) => {
  if(req.user.role == 3) {
    // sort by notes
    const queryText = `SELECT * FROM "incidents" ORDER BY "notes";`
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
router.get('/location', rejectUnauthenticated, (req, res) => {
  if (req.user.role == 3) {
    // sort by notes
    const queryText = `SELECT * FROM "incidents" ORDER BY "location";`
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
router.get('/time_submitted', rejectUnauthenticated, (req, res) => {
  if (req.user.role == 3) {
    // sort by time_submitted
    const queryText = `SELECT * FROM "incidents" ORDER BY "time_submitted" desc;`
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
router.get('/status', rejectUnauthenticated, (req, res) => {
  if (req.user.role == 3) {
    // sort by status
    const queryText = `SELECT * FROM "incidents" ORDER BY "active";`
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
router.get('/view_publicly', rejectUnauthenticated, (req, res) => {
  if (req.user.role == 3) {
    // sort by view_publicly
    const queryText = `SELECT * FROM "incidents" ORDER BY "view_publicly";`
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
router.get('/responder_notes', rejectUnauthenticated, (req, res) => {
  if (req.user.role == 3) {
    // sort by responder_notes
    const queryText = `SELECT * FROM "incidents" ORDER BY "responder_notes";`
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
router.get('/duplicate_entry', rejectUnauthenticated, (req, res) => {
  if(req.user.role == 3) {
    // sort by duplicate_entry
    const queryText = `SELECT * FROM "incidents" ORDER BY "duplicate_entry";`
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
router.get('/submitted_user', rejectUnauthenticated, (req, res) => {
  if(req.user.role == 3) {
    // sort by user who submitted incident
    const queryText = `SELECT * FROM "incidents" ORDER BY "username";`
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
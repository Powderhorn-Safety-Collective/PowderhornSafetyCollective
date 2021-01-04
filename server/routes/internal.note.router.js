const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// This route sends a new note to the database
router.post('/', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
    console.log('REQ', req.body);
    
    const queryText = `INSERT INTO "internal_notes" ("text", "incident_id", "time") VALUES($1, $2, NOW())`;
    pool.query(queryText, [req.body.noteText, req.body.id])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log('error in post notes', error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// this route gets the notes from the database
router.get('/', (req, res) => {
  if (req.user.role > 1) {
    const queryText = `SELECT "id", "text", "incident_id", "time" AT TIME ZONE 'utc' AT TIME ZONE 'america/chicago' as "time" 
    FROM "internal_notes" ORDER BY "id" DESC;`;
    pool.query(queryText)
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
      console.log('error in get notes', error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

module.exports = router;
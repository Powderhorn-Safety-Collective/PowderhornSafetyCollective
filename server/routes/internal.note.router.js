const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // This route sends a new note to the database
  router.post('/', (req, res) => {
    console.log('POST NOTES', req.body);
    const queryText = `INSERT INTO "internal_notes" ("text", "incident_id") VALUES($1, $2)`;
    pool.query(queryText, [req.body.noteText, req.body.id])
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.log('error in post notes', error);
        res.sendStatus(500);
      });
  });
  
  // this route gets the notes from the database
  router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "internal_notes";`;
    pool.query(queryText)
      .then((result) => {res.send(result.rows)})
      .catch((error) => {
        console.log('error in get notes', error);
        res.sendStatus(500);
      })
  })

  router

  module.exports = router;
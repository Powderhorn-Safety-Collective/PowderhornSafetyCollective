const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.post('/', (req, res) => {
    console.log('POST NOTES', req.body);
    const queryText = `INSERT INTO "internal_notes" ("text", "incident_id") VALUES($1, $2)`;
    pool.query(queryText, [req.body.noteText, req.body.id])
      .then((result) => res.sendStatus(201))
      .catch((error) => {
        console.log('error in post notes', error);
        res.sendStatus(500);
      });
  });

  module.exports = router;
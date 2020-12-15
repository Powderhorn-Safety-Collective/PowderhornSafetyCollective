const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    // data to populate incident table
    // retrieving all data from all users
    const queryText = `SELECT * FROM "incidents";`
    pool.query(queryText)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  });

// POST route to save new incident data
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

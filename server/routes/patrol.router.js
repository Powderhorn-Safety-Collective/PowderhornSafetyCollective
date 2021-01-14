const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// route to get list of on patrol members
router.get('/', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
    let queryText = `select id, username, first_name from "user"
    where on_patrol = true;`;
    pool.query(queryText).then((result) => {
      res.send(result.rows)
    }).catch((error) => {
      console.log('Error in get patrol', error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// route to get list of all on patrol and on call members
router.get('/patrolCall', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
    const queryText =  `select id, username, first_name from "user"
                        where on_patrol = true
                        or on_call = true
                        order by on_call;`;
    pool.query(queryText).then((result) => {
      console.log('result.rows', result.rows);    
      res.send(result.rows)
    }).catch((error) => {
      console.log('error in get patrol and on call', error);
      res.sendStatus(500);
    });
  }
});

// route to get count of members currently on patrol
router.get('/count', (req, res) => {
  const queryText =   `select count(*) from "user"
                      where on_patrol = true;`;

  pool.query(queryText).then((result) => {
    console.log('result', result.rows[0]);
    res.send(result.rows[0]);
  }).catch((error) => {
    console.log('error in get patrol count route', error);
    res.sendStatus(500);
  });
});

router.put('/status', rejectUnauthenticated, (req,res) => {
  if (req.user.role > 1) {
    console.log('patrol route REQ IS', req.body.patrolValue);
    let queryText = `UPDATE "user" 
    SET "on_patrol" = $1
    WHERE "id" = $2;`;
    pool.query(queryText, [req.body.patrolValue, req.user.id]).then((result) => {
      res.sendStatus(202)
    }).catch(error => {
      console.log('error in patrol status router', error);
      res.sendStatus(500)
    });
  }
  else {
    res.sendStatus(403);
  }
});

module.exports = router;
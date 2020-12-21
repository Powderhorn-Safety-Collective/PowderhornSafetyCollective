const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  // data to populate incident table
  // retrieving all data from all users
  const queryText = `SELECT *, incidents.id FROM "incidents"
  left join "user" on "user".username = incidents.username
  order by time_submitted;
  ;`
  pool.query(queryText)
  .then((results) => {res.send(results.rows)
  console.log('results.rows', results.rows);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

router.put('/editIncident/:id', (req, res) => {
  const id = req.body.id;
  const type = req.body.type;
  const notes = req.body.notes;
  const location = req.body.location;
  const time_submitted = req.body.time_submitted;
  const status = req.body.status;
  const view_publicly = req.body.view_publicly;
  const responder_notes = req.body.responder_notes;
  const duplicate_entry = req.body.duplicate_entry;
  const client_id = req.body.client_id;
  let queryText= `UPDATE "incidents" 
                  SET 
                    "type" = $1, 
                    "notes" = $2, 
                    "location" = $3, 
                    "time_submitted" = $4, 
                    "status" = $5, 
                    "view_publicly" = $6, 
                    "responder_notes" = $7, 
                    "duplicate_entry" = $8, 
                    "client_id" = $9 
                  WHERE 
                    "id" = $10`;
  pool.query(queryText, [type, notes, location, time_submitted, status, view_publicly, responder_notes, duplicate_entry, client_id, id])
  .then((result) => {
      res.sendStatus(200);
  }).catch((err) => {
      console.log('error in PUT user', err);
      res.sendStatus(500);
  });
});

// this one will get only the public incidents to be displayed
// and sent back to fetchPublicIncidents saga
router.get('/public', (req, res) => {
  const queryText = `SELECT * FROM "incidents"
  where view_publicly = true;`
  pool.query(queryText)
  .then((results) => res.send(results.rows))
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

// This route will update public text for the incident
router.put('/publicText', rejectUnauthenticated, (req, res) => {
  console.log('public text is', req.body);
  const queryText = `update incidents
  set text_for_public_display = $1
  where id = $2;`;

  pool.query(queryText, [req.body.text, req.body.id]).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in publicText put', error);
    res.sendStatus(500);
  });
})

// this route will toggle the status of the active boolean
router.put('/active', rejectUnauthenticated, (req, res) => {
  console.log('in active toggle router with req.body', req.body);
  const queryText = `UPDATE "incidents" 
  SET "active" = $1
  WHERE "id" = $2;`;

  pool.query(queryText, [req.body.active, req.body.id]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('error in active toggle route', error);
    res.sendStatus(500);
  });
  
});

// this route will adjust the boolean values for whether certain portions of an incident
// should be displayed on the public incident display
router.put('/publicPost', rejectUnauthenticated, (req, res) => {
  console.log('in public post route with req.body', req.body);
  const queryText=`update incidents
  set username_public = $1,
  timedate_public = $2,
  location_public = $3,
  type_public = $4,
  user_notes_public = $5,
  view_publicly = true,
  active_public = $6
  where id = $7;
  `;

  pool.query(queryText, [
    req.body.username_public,
    req.body.timedate_public,
    req.body.location_public,
    req.body.type_public,
    req.body.user_notes_public,
    req.body.active_public,
    req.body.id
  ]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('error in publicPost route', error);
    res.sendStatus(500);
  });
});

// This route will mark an incident submitted as duplicate if it has already been submitted by somebody else
router.put('/duplicate', rejectUnauthenticated, (req, res) => {
  console.log('duplicate route', req.body);
  
  const queryText = `update incidents
  set duplicate_entry = true
  where id = $1;`;

  pool.query(queryText, [req.body.id]).then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('error in duplicate route', error);
    res.sendStatus(500);
  });
});

  // route to get count of all active incidents
  router.get('/active', rejectUnauthenticated, (req, res) => {
    // query to count the number of active incidents
    const queryText = `SELECT count("status") AS "status" FROM "incidents" WHERE "status" = 'Active';`
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
  console.log('POST incident', req.body);
  const client_id = req.body.client_id;
  const type = req.body.type;
  const notes = req.body.notes;
  const location = req.body.location;
  // const time_submitted = req.body.time_submitted; // below, we use a function built into SQL to timestamp the current time on submission
  // const status = req.body.status;
  // const view_publicly = req.body.view_publicly;
  // const responder_notes = req.body.responder_notes;
  // const duplicate_entry = req.body.duplicate_entry;
  // const client_id = req.user.id; // user id is used to cross reference new incident post id just use [$8 = client_id]
  const queryText = `INSERT INTO "incidents" (
                                              "type", 
                                              "notes", 
                                              "location", 
                                              "time_submitted",
                                              "client_id"
                                              ) VALUES ($1, $2, $3, NOW(), $4);`;
  pool.query(queryText, [type, notes, location, client_id])
    .then(() => { res.sendStatus(201)})
    .catch((error) => {
        console.log('Error', error);
        res.sendStatus(500);
    });
});

// below are all the query functions to sort the incident table by column
router.get('/type', rejectUnauthenticated, (req, res) => {
  // sort by type
  const queryText = `SELECT * FROM "incidents" ORDER BY "type";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/notes', rejectUnauthenticated, (req, res) => {
  // sort by notes
  const queryText = `SELECT * FROM "incidents" ORDER BY "notes";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/location', rejectUnauthenticated, (req, res) => {
  // sort by notes
  const queryText = `SELECT * FROM "incidents" ORDER BY "location";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/time_submitted', rejectUnauthenticated, (req, res) => {
  // sort by time_submitted
  const queryText = `SELECT * FROM "incidents" ORDER BY "time_submitted";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/status', rejectUnauthenticated, (req, res) => {
  // sort by status
  const queryText = `SELECT * FROM "incidents" ORDER BY "status";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/view_publicly', rejectUnauthenticated, (req, res) => {
  // sort by view_publicly
  const queryText = `SELECT * FROM "incidents" ORDER BY "view_publicly";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/responder_notes', rejectUnauthenticated, (req, res) => {
  // sort by responder_notes
  const queryText = `SELECT * FROM "incidents" ORDER BY "responder_notes";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/duplicate_entry', rejectUnauthenticated, (req, res) => {
  // sort by duplicate_entry
  const queryText = `SELECT * FROM "incidents" ORDER BY "duplicate_entry";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
router.get('/client_id', rejectUnauthenticated, (req, res) => {
  // sort by client_id
  const queryText = `SELECT * FROM "incidents" ORDER BY "client_id";`
  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});
// end of table sorting routes

module.exports = router;
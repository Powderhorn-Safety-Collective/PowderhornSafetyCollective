const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  // data to populate incident table
  // retrieving all data from all users

  if(req.user.role > 1) {
<<<<<<< HEAD
    const queryText = `SELECT "incidents"."id", "type", "notes", "location", "time_submitted", "view_publicly", "duplicate_entry", "client_id", "incidents"."username", "username_public", "timedate_public", "location_public", "type_public", "user_notes_public", "text_for_public_display",  "user"."first_name", "active", "assigned_user", "first_name" AS "assigned" FROM "incidents" 
    LEFT JOIN "user" on "user"."id" = "incidents"."assigned_user"
    ORDER BY "time_submitted" DESC;`;
=======
    const queryText = `SELECT "incidents"."id", "type", "notes", "location", time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted, "view_publicly", "duplicate_entry", "client_id", "incidents"."username", "username_public", "timedate_public", "location_public", "type_public", "user_notes_public", "text_for_public_display",  "user"."first_name", "active", "assigned_user", "first_name" AS "assigned" FROM "incidents" 
    left JOIN "user" on "user"."id" = "incidents"."assigned_user"
    ORDER BY "time_submitted" DESC;`
>>>>>>> main
    pool.query(queryText)
    .then((results) => {res.send(results.rows)
    console.log('results.rows', results.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

router.put('/editIncident/:id', (req, res) => {

  if (req.user.role == 3) {
    const id = req.body.id;
    const type = req.body.type;
    const notes = req.body.notes;
    const location = req.body.location;
    const time_submitted = req.body.time_submitted;
    const active = req.body.status;
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
                      "active" = $5, 
                      "view_publicly" = $6, 
                      "responder_notes" = $7, 
                      "duplicate_entry" = $8, 
                      "client_id" = $9 
                    WHERE 
                      "id" = $10`;
    pool.query(queryText, [type, notes, location, time_submitted, active, view_publicly, responder_notes, duplicate_entry, client_id, id])
    .then((result) => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log('error in PUT user', err);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// this one will get only the public incidents to be displayed
// and sent back to fetchPublicIncidents saga
router.get('/public', (req, res) => {
  const queryText = `select active, client_id, id, location, location_public, notes, submitted_user,
                    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
                    timedate_public, user_notes_public, username, username_public from incidents
                    where view_publicly = true
                    order by time_submitted desc;`
  pool.query(queryText)
  .then((results) => res.send(results.rows))
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

// this route will get incidents associated with this user, either submitted
// by the user or followed by the user.  The user id is used to get those in 
// in the joined table with the user id.
router.get('/personal/:id', rejectUnauthenticated, (req, res) => {
  console.log('personal incidents', req.params.id);
    
  const queryText = `select distinct incidents.id, type, notes, location, 
  time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted, view_publicly, duplicate_entry, client_id, 
  username, timedate_public, location_public, type_public, user_notes_public, 
  text_for_public_display, 
  active, assigned_user, submitted_user, incident_id from incidents
  left join incident_followers
  on incident_id = incidents.id
  where submitted_user = $1
  or incident_followers.user_id = $1;`;

  pool.query(queryText, [req.params.id]).then((result) => {
    console.log('results.rows', result.rows);
    
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in get personal incidents route', error);
    res.sendStatus(500);
  });
});

// This route will update public text for the incident
router.put('/publicText', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
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
  }
  else {
    res.sendStatus(403);
  }
});

// this route will toggle the status of the active boolean for the incident
router.put('/active', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
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
  }
  else {
    res.sendStatus(403);
  }
});

// this route will adjust the boolean values for whether certain portions of an incident
// should be displayed on the public incident display
router.put('/publicPost', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
    console.log('in public post route with req.body', req.body);
    const queryText=`update incidents
    set username_public = $1,
    timedate_public = $2,
    location_public = $3,
    type_public = $4,
    user_notes_public = $5,
    view_publicly = true
    where id = $6;
    `;

    pool.query(queryText, [
      req.body.username_public,
      req.body.timedate_public,
      req.body.location_public,
      req.body.type_public,
      req.body.user_notes_public,
      req.body.id
    ]).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('error in publicPost route', error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// This route will mark an incident submitted as duplicate if it has already been submitted by somebody else
router.put('/duplicate', rejectUnauthenticated, (req, res) => {
  if (req.user.role > 1) {
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
  }
  else {
    res.sendStatus(403);
  }
});

// this route will mark an incident with its assigned PSC Member
router.put('/assign', (req, res) => {
  if (req.user.role > 1) {
    const queryText = `UPDATE "incidents"
    SET "assigned_user" = $1
    WHERE "incidents"."id" = $2;`;
    pool.query(queryText, [req.body.assigned, req.body.incident]).then((result) => {res.sendStatus(200);
    }).catch((error) => {
      console.log('error in assign router', error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
})

  // route to get count of all active incidents
  router.get('/active', rejectUnauthenticated, (req, res) => {
    // query to count the number of active incidents
    const queryText = `SELECT count("active") AS "active" FROM "incidents" WHERE "active" = 'TRUE';`
    pool.query(queryText)
      .then((results) => res.send(results.rows))
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  });

  // get all incident data for searched incident
  router.get('/search/:num', (req, res) => {
    let queryText = `SELECT active, client_id, id, location, location_public, notes, submitted_user,
    text_for_public_display, time_submitted at time zone 'utc' at time zone 'america/chicago' as time_submitted,
    timedate_public, user_notes_public, username, username_public view_publiclyfrom incidents
    WHERE "client_id" = '${req.params.num}';`;
    pool.query(queryText).then((result) => {
      res.send(result.rows[0])
    }).catch((error) => {
      console.log('error in get searched incident', error);
      res.sendStatus(500)      
    })
  })

// POST route to save new incident data
router.post('/', (req, res) => {
  // POST route code here
  console.log('POST incident', req.body);
  const client_id = req.body.client_id;
  const type = req.body.type;
  const notes = req.body.notes;
  const location = req.body.location;
  if (req.user) {
    const username = req.user.username;
    const user_id = req.user.id;
    const queryText = `INSERT INTO "incidents" (
      "type", 
      "notes", 
      "location", 
      "time_submitted",
      "client_id",
      "username",
      "submitted_user"
      ) VALUES ($1, $2, $3, NOW(), $4, $5, $6);`;
    pool.query(queryText, [type, notes, location, client_id, username, user_id])
    .then(() => { res.sendStatus(201)})
    .catch((error) => {
      console.log('Error', error);
      res.sendStatus(500);
    });
  }
  else {
  
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
  }
});



module.exports = router;
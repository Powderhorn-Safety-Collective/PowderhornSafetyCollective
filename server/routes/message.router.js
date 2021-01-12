const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios')

// route for if a user gets an update on an incident they are following
// take in incident id to find followers and client_id to display on text message
router.post('/update', rejectUnauthenticated, (req, res) => {
  console.log('update message', req.body);

  const queryText = `select phone from "user" 
  join incident_followers
  on "user".id = incident_followers.user_id
  where incident_followers.incident_id = $1;`

  pool.query(queryText, [req.body.id]).then((result) => {
    console.log('result', result.rows);
    for (let i = 0; i < result.rows.length; i++) {
    client.messages
    .create({
      body: `The incident you are following, number ${req.body.client_id}, has been updated.  You may log into the PSC app to view details`,
      from: process.env.TWILIO_NUMBER,
      to: `${result.rows[i].phone}`
    })
    .then(message => console.log(message.sid));
  }
  }).catch((error)=>{
    console.log('error', error);
    res.sendStatus(500);
  });
  
});

// router.post('/message_update', (req, res) => {
//   console.log('message route');
//   res.sendStatus(200);
// })

// route for sending a notice to people on patrol / on call and admins when a new incident is submitted
router.post('/newIncident', (req, res) => {
  console.log('new incident req.body', req.body);
    
  // client.messages
  // .create({
  //    body: `There has been a new incident submitted.  You may view it in the PSC app.  It is number ${req.body.client_id}`,
  //    from: process.env.TWILIO_NUMBER,
  //    to: `${req.body.phone}`
  //  })
  // .then(message => console.log(message.sid));
  res.sendStatus(200);
});

// route for sending a notice to people on patrol / on call to investigate an incident
router.post('/assigned', (req, res) => {
  console.log('assigned req.body', req.body);
  
  // client.messages
  // .create({
  //    body: `You have been assigned to an incident.  You may view it in the PSC app.  It is number ${req.body.client_id}`,
  //    from: process.env.TWILIO_NUMBER,
  //    to: `${req.body.phone}`
  //  })
  // .then(message => console.log(message.sid));
  res.sendStatus(200);
});

module.exports = router;
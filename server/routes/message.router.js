const express = require('express');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// router for if a user gets an update on an incident they are following
router.post('/update', rejectUnauthenticated, (req, res) => {
  
  client.messages
  .create({
     body: 'The incident you are following has been updated.  You may log into the PSC app to view details',
     from: process.env.TWILIO_NUMBER,
     to: `+1${req.body.phone}`
   })
  .then(message => console.log(message.sid));
  res.sendStatus(200);
});

// router for sending a notice to people on patrol / on call when a new incident is submitted
router.post('/newIncident', (req, res) => {
  console.log('new incident req.body', req.body);
  
  client.messages
  .create({
     body: 'There has been a new incident submitted.  You may view it in the PSC app.',
     from: process.env.TWILIO_NUMBER,
     to: `+1${req.body.phone}`
   })
  .then(message => console.log(message.sid));
  res.sendStatus(200);
});

module.exports = router;
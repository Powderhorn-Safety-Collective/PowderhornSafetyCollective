const express = require('express');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.post('/update', rejectUnauthenticated, (req, res) => {

  // console.log(req.body.phone);
  
  client.messages
  .create({
     body: 'The incident you are following has been updated.  You may log into the PSC app to view details',
     from: process.env.TWILIO_NUMBER,
     to: `+1${req.body.phone}`
   })
  .then(message => console.log(message.sid));
});

module.exports = router;
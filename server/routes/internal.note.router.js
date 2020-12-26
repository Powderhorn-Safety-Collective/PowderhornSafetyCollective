const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  router.post('/', (req, res) => {
    console.log('POST NOTES', req.body);
    
  })

  module.exports = router;
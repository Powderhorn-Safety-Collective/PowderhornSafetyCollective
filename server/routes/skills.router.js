const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// this route gets all the skills from the skills table
router.get('/', (req, res) => {
  let queryText=`SELECT * FROM "skills";`;
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in get all skills', error);
    res.sendStatus(500);
  })
})

//this route adds a new row to the user_skills table
router.post('/user', (req, res) => {
  console.log('ADDING SKILL', req.body);
  const queryText = ``
  
})

// this route gets all the user_skills data
router.get('/user', (req, res) => {
  let queryText = `SELECT "user_skills"."id", "user_id", "description", "skill_id" FROM "user_skills"
  JOIN "skills" on "skills"."id" = "user_skills"."skill_id";`;
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log('error in get skills', error);
    res.sendStatus(500);
  })
})

module.exports = router;
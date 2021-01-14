const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.delete('/user/:id/:skill', rejectUnauthenticated, (req, res) => {
  if (req.user.role === 3) {
    console.log('deleting skill', req.params.id, req.params.skill);
    const queryText = `DELETE FROM "user_skills" WHERE "user_id" = $1 AND "skill_id" = $2;`;
    pool.query(queryText, [req.params.id, req.params.skill])
    .then((result) => res.send(result))
    .catch((error) => {
      console.log('error in deleting skill', error);
      res.sendStatus(500);
    })
  }
  else {
    res.sendStatus(403);
  }
})

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
router.post('/user', rejectUnauthenticated, (req, res) => {
  if (req.user.role === 3) {
    const queryText = `INSERT INTO "user_skills" ("user_id", "skill_id") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.userId, req.body.skillId])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log('error in post userskill', error);
      res.sendStatus(500);
    })
  }
  else {
    res.sendStatus(403);
  }
})


// this route gets all the user_skills data
router.get('/user', rejectUnauthenticated, (req, res) => {
  if (req.user.role === 3) {
    let queryText = `SELECT "user_skills"."id", "user_id", "description", "skill_id" FROM "user_skills"
    JOIN "skills" on "skills"."id" = "user_skills"."skill_id"`;
    pool.query(queryText).then((result) => {
      res.send(result.rows)
    }).catch((error) => {
      console.log('error in get skills', error);
      res.sendStatus(500);
    })
  }
  else {
    res.sendStatus(403);
  }
})

module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
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
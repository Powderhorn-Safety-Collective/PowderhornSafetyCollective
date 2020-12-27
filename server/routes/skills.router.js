const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  let queryText = `SELECT "user_skills"."id", "user_id", "description", "skill_id" FROM "user_skills"
  JOIN "skills" on "skills"."id" = "user_skills"."skill_id";`;
  
})

module.exports = router;
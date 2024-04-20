const express = require("express");
const db = require("../db");
const utils = require("../util");
const config = require("../config");

const router = express.Router();

//view the users created blog's
router.get("/userBlogs", (request, response) => {
  //const { firstName, lastName, phone } = request.body
  const statement = `select id,title,content,isDeleted,category_id,createdTimestamp from blogs where user_id=?`;
  db.pool.execute(
    statement,
    [request.userId],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.get("/allBlogs", (request, response) => {
  //const { firstName, lastName, phone } = request.body
  const statement = `select id,title,content,isDeleted,
user_id,category_id,createdTimestamp from blogs`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
const express = require("express");
const db = require("../db");
const utils = require("../util");
const config = require("../config");

const router = express.Router();

//view all the categories from categories table
router.get("/all", (request, response) => {
  const statement = `select id,title,description from categories`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.post("/add", (request, response) => {
  const { title, description } = request.body;
  const statement = `insert into categories (title,description) values (?,?);`;
  db.pool.execute(statement, [title, description], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
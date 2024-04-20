const express = require("express");
const db = require("../db");
const utils = require("../util");
const config = require("../config");

const router = express.Router();

//VIEW the USER'S created blog's
router.get("/userBlogs", (request, response) => {
  //const { firstName, lastName, phone } = request.body
  const statement = `select id,title,content,isDeleted,category_id,createdTimestamp from blogs where user_id=?`;
  db.pool.execute(statement, [request.userId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//VIEW ALL the blog's
router.get("/allBlogs", (request, response) => {
  //const { firstName, lastName, phone } = request.body
  const statement = `select id,title,content,isDeleted,
user_id,category_id,createdTimestamp from blogs`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//CREATE a blog by user
router.post("/addBlog", (request, response) => {
  const { title, content, category_id } = request.body;
  const statement = `insert into blogs (title, content, user_id, category_id) values (?,?,?,?);`;
  db.pool.execute(
    statement,
    [title, content, request.userId, category_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//EDIT a blog by user
router.post("/editBlog", (request, response) => {
  const { title, content, category_id, blog_id } = request.body;
  const statement = `update blogs set title=?, content=?, user_id=?, category_id=? where id=?;`;
  db.pool.execute(
    statement,
    [title, content, request.userId, category_id, blog_id],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//DELETE a blog by user
router.post("/deleteBlog", (request, response) => {
  const { blog_id } = request.body;
  const statement = `update blogs set isDeleted=? where id=?;`;
  db.pool.execute(statement, [blog_id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


//SEARCH blog's
router.get("/allBlogs", (request, response) => {
  const { title, lastName, phone } = request.body
  const statement = `select id,title,content,isDeleted,
  user_id,category_id,createdTimestamp from blogs
  where title =? or category_id=(
      select title from categories
      where title like %?%
  ) or user_id=(
      select full_name from categories
      where full_name like %?%
  );`;
  db.pool.execute(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;

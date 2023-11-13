const express = require("express");
const topics_table = require("../database");
const Router = express.Router();

Router.post("/Insert", (req, res) => {  
 
  let Details = req.body;
  console.log(Details);
  topics_table.topics_table("topics_table", "Insert", Details)
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
Router.get("/Read:_ID", (req, res) => {
    const Details = req.params._ID;
    topics_table.topics_table("topics_table", "Read", Details)
      .then((result) => {
        res.send({ Message: result.Message, Result: result.rows });
        console.log(result);
      })
      .catch((err) => {
        res.send(err.message);
      });
  });

module.exports = Router;
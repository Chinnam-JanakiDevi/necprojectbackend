const express = require("express");
const sem_subjects = require("../database");
const Router = express.Router();

Router.post("/Insert", (req, res) => {  
 
  let Details = req.body;
  console.log(Details);
  sem_subjects.sem_subjects("sem_subjects", "Insert", Details)
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
    sem_subjects.sem_subjects("sem_subjects", "Read", Details)
      .then((result) => {
        res.send({ Message: result.Message, Result: result.rows });
        console.log(result);
      })
      .catch((err) => {
        res.send(err.message);
      });
  });



module.exports = Router;
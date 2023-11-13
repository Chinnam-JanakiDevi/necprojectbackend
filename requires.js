const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const sem_subjects = require('./Routes/sem_subjects');
const topics_table=require('./Routes/topics_table');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());
app.get('/',(req,res)=>{
    res.send("successs");
})

app.use('/sem_subjects', sem_subjects);
app.use('/topics_table', topics_table);

module.exports = app;
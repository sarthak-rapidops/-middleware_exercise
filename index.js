const morgan = require('morgan');
const express = require('express');
const fs = require('fs');
const app = express();
const os = require('os');

const port = 3000;

app.use(morgan('tiny'));

let logCollector = function(req,res,next){

    let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  const start = process.hrtime();
  let log = `[${formatted_date}] ${method}:${url} ${status} s \n`;
    
  fs.writeFile('Logs.txt',log,{flag:'a+'},(err)=>{
    if(err) {console.log("ERROR: "+err);}
  });
//   console.log(log);
    next();
};

var pageRequests = function(req,res,next){
    
};

app.use(logCollector);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!!');
  });

app.get('/',(req,res)=>{
res.send("Welcome To Task2!");
});

app.listen(port,(err)=>{
    if (err) {console.log("ERROR:"+err);}
    console.log("Server up and running on port: "+port);
});
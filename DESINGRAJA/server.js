var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var databaseconnection = require('./Dbconnection/config.js');
console.log("Initializing...");
mongoose.Promise = global.Promise;

function check(){
mongoose.connect(databaseconnection.url,{useNewUrlParser:true}).then(()=>{
    console.log("****** Mongodb Connected @ Cloud ******");
     clearInterval(clearint);
}).catch(err =>{
    console.log("XXXX Mongodb !Connected  @ Cloud XXXX");
    clearInterval(clearint);
});
}

var clearint = setInterval(check,3000);

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
require('./Routes/routes')(app);
var port = process.env.PORT || 3000;
app.listen(port);
console.log(port);
var mongoose = require('mongoose');

var usersignup = mongoose.Schema({
  name:String , 
  empid:Number,
  mail:String,
  pwd:Number
});

var usersignup= mongoose.model('usersignup',usersignup);
module.exports = usersignup;

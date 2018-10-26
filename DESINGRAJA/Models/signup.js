var mongoose = require('mongoose');

var signup = mongoose.Schema({
  uname:String , 
  unamelast:String,
  mail:String,
  psw:Number
});

var signup= mongoose.model('signup',signup);
module.exports = signup;

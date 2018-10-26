var mongoose = require('mongoose');

var login = mongoose.Schema({
  user:String ,   
  psw:Number
});

var login= mongoose.model('login',login);
module.exports = login;

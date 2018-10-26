var mongoose = require('mongoose');

var userlogin = mongoose.Schema({
  name:String ,
  empid:Number,
  pwd:Number
});

var userlogin= mongoose.model('userlogin',userlogin);
module.exports = userlogin;

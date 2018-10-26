var mongoose = require('mongoose');

var qstschema = mongoose.Schema(

  {
   question_id:Number,
   Question:String,
   Option1:String,
   Option2:String,
   Option3:String,
   Option4:String,
   KeyAnswer:String 
  }
);
var setqst= mongoose.model('setquestion',qstschema);
module.exports = setqst;
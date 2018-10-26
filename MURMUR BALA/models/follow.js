var mongoose = require('mongoose');
var followschema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  blockNumber: {
    type:Number,
    required: true
  },
  txid: {
    type:String,
    required: true
  },
  from: {
      type:String,
      required: true
  },
  to: {
      type:String,
      required: true
  }
},
{
    timestamps: true
});


mongoose.model('Follow', followschema);

module.exports = mongoose.model('Follow',followschema);

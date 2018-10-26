var mongoose = require('mongoose');
var commentschema = new mongoose.Schema({
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
  murmur_id: {
      type:String,
      required: true
  },
  comment: {
      type:String,
      required: true
  }
},
{
    timestamps: true
});


mongoose.model('Comment', commentschema);

module.exports = mongoose.model('Comment',commentschema);

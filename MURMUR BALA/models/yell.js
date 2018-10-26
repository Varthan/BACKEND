var mongoose = require('mongoose');
var yellschema = new mongoose.Schema({
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
  murmur_id: {
    type:String,
    required: true
  },
  visibility: {
    type:Number,
    required: true
  }
},
{
    timestamps: true
});


mongoose.model('Yell', yellschema);

module.exports = mongoose.model('Yell',yellschema);

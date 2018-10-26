var mongoose = require('mongoose');
var snoopschema = new mongoose.Schema({
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
  likestype: {
    type:Number,
    required: true
  }
},
{
    timestamps: true
});



mongoose.model('Snoop', snoopschema);

module.exports = mongoose.model('Snoop',snoopschema);

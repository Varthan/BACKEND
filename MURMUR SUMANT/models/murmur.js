var mongoose = require('mongoose');
var murmurchema = new mongoose.Schema({
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
  address: {
      type:String,
      required: true
  },
  message: {
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

mongoose.model('Murmur', murmurchema);

module.exports = mongoose.model('Murmur',murmurchema);

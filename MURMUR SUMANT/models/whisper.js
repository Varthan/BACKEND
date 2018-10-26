var mongoose = require('mongoose');
var whisperchema = new mongoose.Schema({
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
  },
  message: {
    type:String,
    required: true
  }
},
{
    timestamps: true
});


mongoose.model('Whisper', whisperchema);

module.exports = mongoose.model('Whisper',whisperchema);

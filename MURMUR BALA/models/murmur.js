var mongoose = require('mongoose');


//SnoopSchema
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

//YellSchema
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


//CommentSchema

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
  from: {
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


//MurmurSchema
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
  },
  snoop : [snoopschema],
  yell : [yellschema],
  comments:[commentschema]
},
{
    timestamps: true
});

mongoose.model('Murmur', murmurchema);

module.exports = mongoose.model('Murmur',murmurchema);

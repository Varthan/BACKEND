const Murmur = require('./models/murmur');
const Yell = require('./models/yell');
const Snoop = require('./models/snoop');
const Follow = require('./models/follow');
const Whisper = require('./models/whisper');
const Comment = require('./models/comment');
var db = require('./db');

Eos = require('eosjs')
eos = Eos.Localnet();

var murmur = new Murmur();
var yell = new Yell();
var snoop = new Snoop();
var follow = new Follow();
var whisper = new Whisper();
var comment = new Comment();

async function logUpdate(state, payload, blockInfo, context) {
  return new Promise(async (resolve, reject) => {
  const blockNum = JSON.stringify(blockInfo.blockNumber);
  let interestedLogs = [];
  let trx  = await eos.getBlock(blockNum);
  var transaction = trx.transactions;
  for (let j=0; j< transaction.length; j++) {
    const res = await eos.getTransaction({ id : transaction[j].trx.id});
    var blockNumber = res.block_num;
    var consoleData = res.traces[0].console;
    var txId = res.traces[0].trx_id;
    const cdata = consoleData.split(";;");
    interestedLogs.push({blockNumber,txId,cdata});

    let queueData = [];
    queueData = queueData.concat(interestedLogs[j]);
   
    console.log("queueData j",queueData[j].cdata[0]);
    //murmur
    if(queueData[j].cdata[0] == 'murmur'){
      console.log("sucess");
      var newmurmur = new Murmur({
        name : queueData[j].cdata[0],
        blockNumber : parseInt(queueData[j].blockNumber),
        txid : queueData[j].txId,
        address : queueData[j].cdata[1],
        message : queueData[j].cdata[2],
        visibility : parseInt(queueData[j].cdata[3])
      });
      newmurmur.save(function(err, res) {
        if(err)
        console.log("Err",err)
        else
        console.log("res",res); 
      })
      }

      //Yell
      else if(queueData[j].cdata[0] == 'yell'){
        console.log("sucess");
        var yell = new Yell({
          name : queueData[j].cdata[0],
          blockNumber : parseInt(queueData[j].blockNumber),
          txid : queueData[j].txId,
          from : queueData[j].cdata[1],
          murmur_id : queueData[j].cdata[2],
          visibility : parseInt(queueData[j].cdata[3])
        });  
        yell.save(function(err, res) {
          if(err)
          console.log("Err",err)
          else
          console.log("res",res); 
        })
        }
  
        //Snoop
        else if(queueData[j].cdata[0] == 'snoop'){
          console.log("sucess");
          var snoop = new Snoop({
            name : queueData[j].cdata[0],
            blockNumber : parseInt(queueData[j].blockNumber),
            txid : queueData[j].txId,
            from : queueData[j].cdata[1],
            murmur_id : queueData[j].cdata[2],
            likestype : queueData[j].cdata[3]
          });   
          snoop.save(function(err, res) {
            if(err)
            console.log("Err",err)
            else
            console.log("res",res); 
          })
          }
  
        //Follow
        else if(queueData[j].cdata[0] == 'follow'){
          console.log("sucess");
          var follow = new Follow({
            name : queueData[j].cdata[0],
            blockNumber : parseInt(queueData[j].blockNumber),
            txid : queueData[j].txId,
            from : queueData[j].cdata[1],
            to : queueData[j].cdata[2]
          });
          follow.save(function(err, res) {
            if(err)
            console.log("Err",err)
            else
            console.log("res",res); 
          })
          }
  
        //Whisper
        else if(queueData[j].cdata[0] == 'whisper'){
          console.log("sucess");
          var whisper = new Whisper({
            name : queueData[j].cdata[0],
            blockNumber : parseInt(queueData[j].blockNumber),
            txid : queueData[j].txId,
            from : queueData[j].cdata[1],
            to : queueData[j].cdata[2],
            message : queueData[j].cdata[3]          
          });  
          whisper.save(function(err, res) {
            if(err)
            console.log("Err",err)
            else
            console.log("res",res); 
          })
          }
  
        //Comment
        else if(queueData[j].cdata[0] == 'comment'){
          console.log("comment sucess");
          var comment = new Comment({
            name : queueData[j].cdata[0],
            blockNumber : parseInt(queueData[j].blockNumber),
            txid : queueData[j].txId,
            murmur_id : queueData[j].cdata[1],
            comment : queueData[j].cdata[2] 
          });        
          comment.save(function(err, res) {
            if(err)
            console.log("Err",err)
            else
            console.log("res",res); 
          })
          }
      }  
  return resolve({
    interestedLogs
  });
});
}

const effects = [
  {
    actionType: "murmur::murmur",
    effect: logUpdate,
  },
  {
    actionType: "murmur::yell",
    effect: logUpdate,
  },
  {
    actionType: "murmur::snoop",
    effect: logUpdate,
  },
  {
    actionType: "murmur::follow",
    effect: logUpdate,
  },
  {
    actionType: "murmur::whisper",
    effect: logUpdate,
  },
  {
    actionType: "murmur::comment",
    effect: logUpdate,
  },
]

module.exports = effects

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

      

        //Yell updation reimplementation
        else if(queueData[j].cdata[0] == 'yell'){
          console.log("sucess");
          let murid = queueData[j].cdata[2];

          Murmur.updateOne({txid:murid},{$push:{yell:{name : queueData[j].cdata[0],blockNumber : parseInt(queueData[j].blockNumber),
            txid : queueData[j].txId,from : queueData[j].cdata[1],murmur_id : queueData[j].cdata[2],visibility : parseInt(queueData[j].cdata[3])
          }}}).then(c => console.log(c)).catch(err => console.log(err));
        }
  
        
        //Snoop reimplementation 

        else if(queueData[j].cdata[0] == 'snoop'){

          let murid = queueData[j].cdata[2];
          console.log(murid)

          Murmur.updateOne({txid:murid},{$push:{snoop:{name : queueData[j].cdata[0],blockNumber : parseInt(queueData[j].blockNumber),
            txid : queueData[j].txId,from : queueData[j].cdata[1],murmur_id : queueData[j].cdata[2],likestype : queueData[j].cdata[3]}}})
            .then(c => console.log(c)).catch(err => console.log(err));
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


          //Comments reimplementation
          else if(queueData[j].cdata[0] == 'comment'){
            console.log("success");
    
            let murmurid =  queueData[j].cdata[2];
    
            Murmur.updateOne({txid:murmurid},{$push:{comments:{name : queueData[j].cdata[0],blockNumber : parseInt(queueData[j].blockNumber),
              txid : queueData[j].txId,from : queueData[j].cdata[1],murmur_id : queueData[j].cdata[2],
              comment : queueData[j].cdata[3]}}}).then(c => console.log(c)).catch(err => console.log(err));
          }
  
     

        }
      

       

  return resolve({
    interestedLogs
  });
});
}

const effects = [
  {
    actionType: "murmurdapp::murmur",
    effect: logUpdate,
  },
  {
    actionType: "murmurdapp::yell",
    effect: logUpdate,
  },
  {
    actionType: "murmurdapp::snoop",
    effect: logUpdate,
  },
  {
    actionType: "murmurdapp::follow",
    effect: logUpdate,
  },
  {
    actionType: "murmurdapp::whisper",
    effect: logUpdate,
  },
  {
    actionType: "murmurdapp::comment",
    effect: logUpdate,
  },
]

module.exports = effects

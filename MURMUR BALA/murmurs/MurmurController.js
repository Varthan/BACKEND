var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const path = require('path');
const Murmur = require('../models/murmur');
const eosConfig = require('../config').eosConfig;
Eos = require('eosjs')
const Comments = require('../models/comment');
const Follows = require('../models/follow');
const Yells = require('../models/yell');
const Snoops = require('../models/snoop');
const Whispers = require('../models/whisper');

eosConfig.binaryen = require("binaryen")
eos = Eos.Localnet(eosConfig)

router.use(bodyParser.urlencoded({ extended: true }));

var authorname = 'murmurapp2';
  

//Get Murmurs
router.post('/api/getMurmurs', function (req, res) {
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
     var murmur = req.body.query.address;
     //console.log("murmur",murmur);
    } else {
    query = {};
    }
    //console.log("murmur",murmur);
    Murmur.find().then(c =>{ console.log(c);
        res.status(200).send(c);
    }).catch(err => console.log(err))
  });



  //Get Comments reimplementation

  router.post('/api/getComment',(req,res) =>{
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }

    Murmur.find({txid:murmurId}).then(c => {
      res.status(200).send(c)
    }).catch(err => console.log(err))
  })
  
  //Get Followers
  router.post('/api/getFollow', function (req, res) {
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var _from = req.body.query.from;
    var _to = req.body.query.to;
    } else {
    query = {};
    }
    Follows.find({from:_from},"from to createdAt", function(err, results) {//"from": "10857945503656574976"
    if(err){
    console.log("err",err);
    }
    else{
    console.log("results",results);
    return res.status(200).send(results);
    }
    });
  });
  
  
  //Get yell reimplementation
  router.post('/api/getYell',(req,res)=>{

    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }


    Murmur.find({txid:murmurId}).then(c => {
      res.status(200).send(c.yell);

    }).catch(err => console.log(err));
  })
  
  

  //get snoop reimplementation

 router.post('/api/getSnoop',(req,res) => {

    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }

    Murmur.find({txid:murmurId}).then(c => {
      res.status(200).send(c.snoop);
    }).catch(err => console.log(err))
  })
  
  //Get Whispers
  router.post('/api/getWhisper', function (req, res) {
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var _from = req.body.query.from;
    var _to = req.body.query.to;
    } else {
    query = {};
    }
    Whispers.find({from:_from,to:_to},"from to message createdAt", function(err, results) {
    if(err){
    console.log("err",err);
    }
    else{
    console.log("results",results);
    return res.status(200).send(results);
    }
    });
  });

//Get MurmursDetails 
router.post('/api/getFollowingsDetails', function (req, res) {
  if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
  if (req.body.query) {
  var _from = req.body.query.from;
  } else {
  query = {};
  }
  Follows.find({from:_from},"to", function(err, results) {
  if(err){
  console.log("err",err);
  }
  else{
    var addresses = results.map(function(doc) { return doc.to; });
    Murmur.find({address: {$in: addresses}},"address message createdAt", function(err, docs) {
    if(err){
      console.log("err",err);
    }
    else
    {
    console.log("doc",docs);
    return res.status(200).send(docs);
    }  
    });  
    }
  });
 });

 //Get Murmur snoops yells and  comments
 router.post('/api/getPostDetails',function(req,res){
  if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
  if (req.body.query) {
  var _address = req.body.query.address;
  } else {
  query = {};
  }
  Murmur.find({address:_address},"-_id txid address message createdAt", function(err,results){
  if(err){
  console.log("err",err);
  }  
  else{
  var murmursDatas = results;   
  var trxid = results.map(function(doc){return doc.txid});
  Snoops.find({murmur_id:trxid}).countDocuments(function(err, sresults) {
  if(err){
  console.log("err",err);
  }
  else{
  var likes = sresults;  
  
  Comments.find({murmur_id:{$in:trxid}},"-_id from comment createdAt",function(err,cresult){
  if(err){
  console.log("Err",err);  
  }else{
  var commentDatas = cresult  

  Yells.find({murmur_id:{$in:trxid}}).countDocuments(function(err, yresults){
  if(err){
  console.log("err",err);
  }
  else{
  var yells = yresults;     
  var data =[];
  data.push({murmursDatas,likes,yells,commentDatas});
  var postDatas = JSON.stringify(data);
  console.log("data",postDatas);
  res.status(200).send(postDatas);
  }  
  })
  }  
  })
  }
  });
  }
  })  
 })

//Search the peoples


router.post('/api/getSearchname',(req,res) => {

var searchname = [];

  if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }

      Murmur.find({}).then(c => {

            for(var i=0;i<c.length;i++){

                searchname.push(c[i].address);
            }
           // console.log(searchname);

             res.status(200).send(searchname);

      }).catch(err => console.log(err))
    
})




  //Creating murmur
  router.post('/api/postMurmur',function(req,res){
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var author = req.body.query.author;
    var content = req.body.query.content;
    var visibility = parseInt(req.body.query.visibility);
    } else {
    query = {};
    }
  eos.transaction(authorname, myaccount => {
   myaccount.murmur(author,content,visibility , { authorization: [authorname]})
   }),function (err, results) {
     if (err) return res.status(500).send("There was a problem adding the information to the database.");
     else{
     console.log("results",results);
     res.status(200).send(results);
     }
  };
  })
 
 //Follow
 router.post('/api/postFollow',function(req,res){
  if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
  if (req.body.query) {
  var from = req.body.query.from;
  var to = req.body.query.to;
  } else {
    query = {};
  }
    eos.transaction(authorname, myaccount => {
     myaccount.follow(from,to , { authorization: [authorname]})
    }),function (err, results) {
     if (err) return res.status(500).send("There was a problem adding the information to the database.");
     else{
     console.log("results",results);
     res.status(200).send(results);
     }
     };
    })
 
 //Yell
 router.post('/api/postYell',function(req,res){
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var from = req.body.query.from;
    var murmur_id = req.body.query.murmur_id;
    var visibility = parseInt(req.body.query.visibility);
    } else {
    query = {};
    }
    eos.transaction(authorname, myaccount => {
     myaccount.yell(from,murmur_id,visibility , { authorization: [authorname]})
    }),function (err, results) {
     if (err) return res.status(500).send("There was a problem adding the information to the database.");
     else{
     console.log("results",results);
     res.status(200).send(results);
     }
     };
    })
    
 //Snoop
 router.post('/api/postSnoop',function(req,res){
     if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
     if (req.body.query) {
     var from = req.body.query.from;
     var murmur_id = req.body.query.murmur_id;
     var likestype = parseInt(req.body.query.likestype);
     console.log("liketype",likestype);
     } else {
     query = {};
     }
    eos.transaction(authorname, myaccount => {
     myaccount.snoop(from,murmur_id,likestype , { authorization: [authorname]})
    }),function (err, results) {
     if (err) return res.status(500).send("There was a problem adding the information to the database.");
     else{
     console.log("results",results);
     res.status(200).send(results);
     }
     };
    })
    
 //Whisper
 router.post('/api/postWhisper',function(req,res){
     if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
     if (req.body.query) {
     var from = req.body.query.from;
     var to = req.body.query.to;
     var content = req.body.query.content;
     } else {
     query = {};
     }
    eos.transaction(authorname, myaccount => {
     myaccount.whisper(from,to,content , { authorization: [authorname]})
    }),function (err, results) {
     if (err) return res.status(500).send("There was a problem adding the information to the database.");
     else{
     console.log("results",results);
     res.status(200).send(results);
     }
     };
    })
    
 //Comment
 router.post('/api/postComment',function(req,res){
     if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
     if (req.body.query) {
     var _from = req.body.query.from;  
     var murmur_id = req.body.query.murmur_id;
     var comment = req.body.query.comment;
     } else {
     query = {};
     }
    eos.transaction(authorname, myaccount => {
     myaccount.comment(_from,murmur_id,comment , { authorization: [authorname]})
    }),function (err, results) {
    if(err){
    console.log("err",err);
    }
    else{
    console.log("results",results);
    return res.status(200).send(results);
    }
    };
    })  

  
module.exports = router;
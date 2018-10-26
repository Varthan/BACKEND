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

var authorname = 'murmur';
  

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
    Murmur.find({address:murmur},"address message createdAt", function(err, results) {
    if(err){
    console.log("err",err);
    }
    else{
    console.log("results",results);
    return res.status(200).send(results);
    }
    });
  });

  //Get Comments
router.post('/api/getComment', function (req, res) {
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }
    Comments.find({murmur_id:murmurId},"murmur_id comment createdAt", function(err, results) {
      if(err){
      console.log("err",err);
      }
      else{
      console.log("results",results);
      return res.status(200).send(results);
      }
    });
  });
  
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
  
  //Get Yells
  router.post('/api/getYell', function (req, res) {
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }
    Yells.find({murmur_id:murmurId},"from murmur_id createdAt", function(err, results) {
    if(err){
    console.log("err",err);
    }
    else{
    console.log("results",results);
    return res.status(200).send(results);
    }
    });
  });
  
  //Get Snoops
  router.post('/api/getSnoop', function (req, res) {
    if (!req.body) return res.status(500).send("There was a problem gettting the information from the database.");
    if (req.body.query) {
    var murmurId = req.body.query.murmur_id;
    } else {
    query = {};
    }
    Snoops.find({murmur_id:murmurId},"from murmur_id createdAt", function(err, results) {
    if(err){
    console.log("err",err);
    }
    else{
    console.log("results",results);
    return res.status(200).send(results);
    }
    });
  });
  
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
  eos.transaction(author, myaccount => {
   myaccount.murmur(author,content,visibility , { authorization: [author]})
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
     var murmur_id = req.body.query.murmur_id;
     var comment = req.body.query.comment;
     } else {
     query = {};
     }
    eos.transaction(authorname, myaccount => {
     myaccount.comment(murmur_id,comment , { authorization: [authorname]})
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
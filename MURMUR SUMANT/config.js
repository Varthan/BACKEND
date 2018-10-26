var express = require('express');
var bodyparser = require('body-parser')
var app = express()
fs = require('fs')

var eosConfig = {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'],
    httpEndpoint: 'http://127.0.0.1:8888',
    //httpEndpoint: 'http://18.191.181.219:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false,
    sign: true
  }
  
  var db = {
    MONGOOSE_CONNECTION_STRING : 'mongodb+srv://eosblogtrack:eosblogtrack@cluster0-yn4b8.mongodb.net/',
    MONGOOSE_DBNAME : 'murmurdbs',
    AGENDA_CONNECTION_STRING : 'mongodb+srv://eosblogtrack:eosblogtrack@cluster0-yn4b8.mongodb.net/',
    AGENGA_DBNAME : 'murmurdbs',
    AGENGA_COLLECTION_NAME : 'agendaJobs'
  }
  
  module.exports = {
    dbConfig : db,
    eosConfig : eosConfig
  }
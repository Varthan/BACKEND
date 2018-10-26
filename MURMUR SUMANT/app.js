const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var db = require('./db');
var index = require('./index').actionWatcher;
var effects = require('./effects');
const eosConfig = require('./config').eosConfig;
Eos = require('eosjs')
global.__root   = __dirname + '/';


eosConfig.binaryen = require("binaryen")
eos = Eos.Localnet(eosConfig)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')))

var MurmurController = require(__root + 'murmurs/MurmurController');
app.use('/',MurmurController);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

module.exports = app;

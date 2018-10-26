var models_schema = require('../Models/setqst_Schema');
var signup_schema = require('../Models/signup');
var login_schema = require('../Models/login');
var login_schema = require('../Models/login');
var userlog_schema = require('../Models/userlogin');
var userssignup_schema = require('../Models/usersignup');

exports.test = (req,res)=>{
    console.log("get method connected");
    res.send("get method connected");
}

exports.qst = (req,res)=>{

// bodyparser
 var qst = new models_schema({ 
    question_id:req.body.qid,
    Question:req.body.question,
    Option1:req.body.option1,
    Option2:req.body.option2,
    Option3:req.body.option3,
    Option4:req.body.option4,
    KeyAnswer:req.body.keyAnswer 
});
// save
 qst.save().then(data=>{
     console.log("success");
 }).catch(err=>{
     console.log("Not inserted");
 })
}

// get question
exports.getquestion = (req, res) => {
    models_schema.find()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        
        console.log(err);
        res.send(err);
    });
}

// delete question
exports.deletequestion = (req, res) => {
    models_schema.findOneAndDelete(req.body.question_id)
    .then(data => {
        res.send("deleted");
        console.log("deleted");
    }).catch(err => {
    
         console.log(err);
         res.send(err);
    });
}

// update question


exports.updatequestion = (req, res) => {
    models_schema.findOneAndUpdate(req.body.question_id,{$set:{question:req.body.question,option1:req.body.option1,option2:req.body.option2,option3:req.body.option3,option4:req.body.option4,keyAnswer:req.body.keyAnswer}},function(err, result){
        if(err){
            res.send(err);
            console.log(err)
        }
        if(result)
        {
            res.send("updated");
            console.log("updated");
        }
    })
   
}

exports.signup = (req, res) => {
    var signup = new signup_schema({
        uname:req.body.uname,
        unamelast:req.body.unamelast,
        mail:req.body.mail,
        psw:req.body.psw
    });

    signup.save().then(data=>{
        console.log("signup");
    }).catch(err=>{
        console.log("Not signup");
    })
}


exports.signupdata = (req, res) => {
    signup_schema.find()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        
        console.log(err);
        res.send(err);
    });
}



exports.login = (req, res) => {
    var login = new login_schema({
        user:req.body.user,
        psw:req.body.psw
    });

    login.save().then(data=>{
        console.log("login");
    }).catch(err=>{
        console.log("Not login");
    })
}


exports.logindata = (req, res) => {
    login_schema.find()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        
        console.log(err);
        res.send(err);
    });
}

exports.usersignup = (req, res) => {
    var usersignup = new userssignup_schema(req.body);

    usersignup.save().then(data=>{
        console.log("signup");
    }).catch(err=>{
        console.log("Not signup");
    })
}


exports.usersignupdata = (req, res) => {
    userssignup_schema.find()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        
        console.log(err);
        res.send(err);
    });
}




exports.userlog = (req, res) => {
    var userlog = new userlog_schema({
        name:req.body.name,
        empid:req.body.empid,
        pwd:req.body.pwd
    });

    userlog.save().then(data=>{
        console.log("login");
    }).catch(err=>{
        console.log("Not login");
    })
}


exports.userlogdata = (req, res) => {
    userlog_schema.find()
    .then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        
        console.log(err);
        res.send(err);
    });
}


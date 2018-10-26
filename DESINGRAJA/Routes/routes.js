module.exports=(app)=>{
    var route_controllers = require('../Controllers/controller');
    
    // test purpose
    app.get('/',route_controllers.test);

    // create question
    app.post('/createquestion',route_controllers.qst);

    // signup
    app.post('/signup',route_controllers.signup);

    // signup
    app.get('/signupdata',route_controllers.signupdata);

    // login
    app.post('/login',route_controllers.login);

    // login
    app.get('/logindata',route_controllers.logindata);

    // usersignup
    app.post('/usersignup',route_controllers.usersignup);

    // usersignup
    app.get('/usersignupdata',route_controllers.usersignupdata);

    // userlog
    app.post('/userlog',route_controllers.userlog);

    // userlog
    app.get('/userlogdata',route_controllers.userlogdata);

    // view all question
    app.get('/getquestion',route_controllers.getquestion);

    // delete one question
    app.delete('/deletequestion',route_controllers.deletequestion);

    // update one question
    app.put('/updatequestion',route_controllers.updatequestion);
}
var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/users.js');
var login = express();

var jwt = require('jsonwebtoken');
var secret =  "5TYQdOUzC5z3o0Pnu0DxJ1r5hmpHWQmvmYfCR1LXz4GBAbmnHRZu3Bo9jRMqfl8cEa60TwyuWazqsxSUPz3tod1jQFzYOhVUoh23ND89wHVcWie7Ipciid3QsF5g4E5i6J6lWDIndIqePgFxHQME0Vh0uxTMr9hTuaM69WSCdUZy3spZiZ9y";
login.set('superSecret', secret);

login.use(bodyParser.json());
login.use(bodyParser.urlencoded({extent: true}));

login.route('/login')
  .post(function(req, res){
    User.findOne({email: req.body.user.email}, function(err, user){
      if(err) throw err;
      if(!user){
        res.json({success: false, message: 'Invalid email or password!'});
      }else if (user) {
        if (!user.isValidPassword(req.body.user.password)){
          res.json({success: false, message: 'Invalid email or password!'});
        }else{
          user.passwordHash = "";
          user.salt = "";
          var token = jwt.sign(user, login.get('superSecret'), {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            admin: user.admin
          });
        }
      }
    });
  });

// login.get('/register', function(req, res) {
//
//     // create a user
//     var user = new User({
//       name: '',
//       email: '',
//     });
//
//     user.setPassword('');
//
//     // save the user
//     user.save(function(err) {
//       if (err) throw err;
//       console.log('User saved successfully');
//       res.json({ success: "user saved" });
//     });
//   });


module.exports = login;
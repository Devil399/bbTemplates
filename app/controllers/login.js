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
  .get(function(req, res){
    res.json({message: "Yes login"});
  })
  .post(function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
      if(err) throw err;
      if(!user){
        res.json({success: false, message: 'Invalid email.'});
      }else if (user) {
        if (!user.isValidPassword(req.body.password)){
          res.json({success: false, message: 'Invalid password.'});
        }else{
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

login.get('/setup', function(req, res) {

    // create a sample user
    var user = new User({
      name: 'Shashank',
      email: 'sshekhar1094@gmail.com',
      admin: true
    });

    user.setPassword('admin');

    // save the sample user
    user.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: "user saved" });
    });
  });

login.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = login;

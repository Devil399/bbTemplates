var express = require('express');
var bodyParser = require('body-parser');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var Template = require('../models/templates.js');
var api = express();

var jwt = require('jsonwebtoken');
var secret =  "5TYQdOUzC5z3o0Pnu0DxJ1r5hmpHWQmvmYfCR1LXz4GBAbmnHRZu3Bo9jRMqfl8cEa60TwyuWazqsxSUPz3tod1jQFzYOhVUoh23ND89wHVcWie7Ipciid3QsF5g4E5i6J6lWDIndIqePgFxHQME0Vh0uxTMr9hTuaM69WSCdUZy3spZiZ9y";
api.set('superSecret', secret);

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extent: true}));


api.route('/templates')
    .get(function(req, res) {
        Template.find({}, function(err, templates) {
            if (err){
              res.send(err);
            }
            res.json(templates);
        });
    });


api.route('/templates/:template_id')
    .get(function(req, res){
        Template.findById(req.params.template_id, function(err, template){
            if (err){
              res.json({success: false, message: err});
            }
            res.json({success: true, template: template});
        });
    });


api.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, api.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.userId = decoded._id;
          next();
        }
      });
    } else {
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
});


api.route('/templates/:template_id/like')
    .get(function(req, res){
        Template.findById(req.params.template_id, function(err, template){
            if(template.likedBy.indexOf(req.userId) >= 0){
              var pos = template.likedBy.indexOf(req.userId);
              template.likedBy.splice(pos, 1);
              template.likes -= 1;
              template.save(function(err, Temp){
                  if (err){
                    res.json({ success: false, message: err });
                  }else{
                    res.json({ success: true, message: "Template like removed!", likes: Temp.likes, likedBy: Temp.likedBy });
                  }
              });
            }else{
              template.likedBy.push(req.userId);
              template.likes += 1;
              template.save(function(err, Temp){
                  if (err){
                    res.json({ success: false, message: err });
                  }else{
                    res.json({ success: true, message: "Template liked!", likes: Temp.likes, likedBy: Temp.likedBy });
                  }
              });
            }
        });
    });


api.route('/templates/:template_id/dislike')
    .get(function(req, res){
        Template.findById(req.params.template_id, function(err, template){
            if(template.dislikedBy.indexOf(req.userId) >= 0){
              var pos = template.dislikedBy.indexOf(req.userId);
              template.dislikedBy.splice(pos, 1);
              template.dislikes -= 1;
              template.save(function(err, Temp){
                  if (err){
                    res.json({ success: false, message: err });
                  }else{
                    res.json({ success: true, message: "Template dislike removed!", dislikes: Temp.dislikes, dislikedBy: Temp.dislikedBy });
                  }
              });
            }else{
              template.dislikedBy.push(req.userId);
              template.dislikes += 1;
              template.save(function(err, Temp){
                  if (err){
                    res.json({ success: false, message: err });
                  }else{
                    res.json({ success: true, message: "Template disliked!", dislikes: Temp.dislikes, dislikedBy: Temp.dislikedBy });
                  }
              });
            }
        });
    });


api.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, api.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          if(decoded.admin === true){
            req.userId = decoded._id;
            next();
          }else{
            return res.json({ success: false, message: 'Access Denied' });
          }
        }
      });
    } else {
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
});


api.route('/templates')
    .post(function(req, res){
      var template = new Template();
      template.name = req.body.template.name;
      template.price = req.body.template.price;
      template.url = req.body.template.url;
      template.createdBy = req.body.template.createdBy;
      template.save(function(err, newTemplate){
        if(err){
          res.send(err);
        }
        res.json({message: "Template created!", id: newTemplate._id});
      });
    });


api.route('/templates/search')
    .post(function(req, res) {
        var name = new RegExp(req.body.template.name, 'i');
        var url = new RegExp(req.body.template.url, 'i');
        var createdBy = new RegExp(req.body.template.createdBy, 'i');

        var likesStart = 0;
        var likesEnd = 999999999;
        if(req.body.template.likesStart){
          likesStart = req.body.template.likesStart;
        }
        if(req.body.template.likesEnd){
          likesEnd = req.body.template.likesEnd;
        }

        var dislikesStart = 0;
        var dislikesEnd = 999999999;
        if(req.body.template.dislikesStart){
          dislikesStart = req.body.template.dislikesStart;
        }
        if(req.body.template.dislikesEnd){
          dislikesEnd = req.body.template.dislikesEnd;
        }

        var priceStart = 0;
        var priceEnd = 999999999;
        if(req.body.template.priceStart){
          priceStart = req.body.template.priceStart;
        }
        if(req.body.template.priceEnd){
          priceEnd = req.body.template.priceEnd;
        }

        var createdOnStart = "2015-07-01T00:00:00.000Z";
        var createdOnEnd = new Date();
        if(req.body.template.createdOnStart){
          createdOnStart = req.body.template.createdOnStart + "T00:00:00.000Z";
        }
        if(req.body.template.createdOnEnd){
          createdOnEnd = req.body.template.createdOnEnd + "T23:59:59.999Z";
        }

        Template.find({
          name: name,
          url: url,
          createdBy: createdBy,
          likes: {$gte: likesStart, $lte: likesEnd},
          dislikes: {$gte: dislikesStart, $lte: dislikesEnd},
          price: {$gte: priceStart, $lte: priceEnd},
          createdOn: {$gte: createdOnStart, $lte: createdOnEnd}
        }, function(err, templates) {
            if (err){
              res.send(err);
            }
            res.json(templates);
        });
    });


api.route('/templates/:template_id')
    .post(function(req, res) {
        Template.findById(req.params.template_id, function(err, template){
            if (err){
              res.send(err);
            }
            template.name = req.body.template.name;
            template.price = req.body.template.price;
            template.url = req.body.template.url;
            template.createdBy = req.body.template.createdBy;
            template.save(function(err){
                if (err){
                  res.send(err);
                }
                res.json({ message: 'Template updated!' });
            });
        });
    })
    .delete(function(req, res){
        Template.remove({
            _id: req.params.template_id
        }, function(err, template){
            if (err){
              res.send(err);
            }
            fs.unlink(path.join(__dirname+'/../views/images/templates/', req.params.template_id));
            res.json({ message: 'Template deleted!' });
        });
    });


api.route('/templates/:template_id/image')
    .post(function(req, res){
      var busboy = new Busboy({ headers: req.headers });
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var saveTo = path.join(__dirname+'/../views/images/templates/', req.params.template_id);
        console.log(saveTo);
        file.pipe(fs.createWriteStream(saveTo));
      });
      busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("Image uploaded!");
      });
      return req.pipe(busboy);
    });


module.exports = api;

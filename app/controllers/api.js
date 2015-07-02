var express = require('express');
var bodyParser = require('body-parser');
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var Template = require('../models/templates.js');
var api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extent: true}));

api.use(function(req, res, next) {
    console.log('Something is happening in ' + req.url);
    next();
});

api.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

api.route('/templates')
    .post(function(req, res){
      var template = new Template();
      template.name = req.body.template.name;
      template.price = req.body.template.price;
      template.url = req.body.template.url;
      template.createdBy = req.body.template.createdBy;
      template.cretedOn = new Date();
      template.save(function(err, newTemplate){
        if(err){
          res.send(err);
        }
        res.json({message: "Template created!", id: newTemplate._id});
      });
    })
    .get(function(req, res) {
        Template.find(function(err, templates) {
            if (err){
              res.send(err);
            }
            res.json(templates);
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

api.route('/templates/:template_id')
    .get(function(req, res){
        Template.findById(req.params.template_id, function(err, template){
            if (err){
              res.send(err);
            }
            res.json(template);
        });
    })
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

module.exports = api;

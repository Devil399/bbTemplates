var express = require('express');
var bodyParser = require('body-parser');
var Template = require('../models/templates.js');
var api = express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extent: true}));

api.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

api.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

api.route('/templates')
    .post(function(req, res){
      var template = new Template();
      template.name = req.body.name;
      template.price = req.body.price;
      template.url = req.body.url;
      template.createdBy = req.body.createdBy;
      template.createdOn = req.body.createdOn;
      template.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message: "Template created!"});
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

api.route('/templates/:template_id')
    .get(function(req, res){
        Template.findById(req.params.template_id, function(err, template){
            if (err){
              res.send(err);
            }
            res.json(template);
        });
    })
    .put(function(req, res) {
        Template.findById(req.params.template_id, function(err, template){
            if (err){
              res.send(err);
            }
            if(req.body.name)template.name = req.body.name;
            if(req.body.price)template.price = req.body.price;
            if(req.body.url)template.url = req.body.url;
            if(req.body.createdBy)template.createdBy = req.body.createdBy;
            if(req.body.createdOn)template.createdOn = req.body.createdOn;
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
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = api;

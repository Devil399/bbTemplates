var express = require('express');
var app = express();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bbTemplates');
var api = require('./app/controllers/api.js');

var port = process.env.PORT || 8080;

app.use("/api", api);
app.use("/", express.static(__dirname + "/app/views"));

app.listen(port);
console.log("Magic happens on port " + port);

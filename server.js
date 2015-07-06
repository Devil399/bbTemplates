var express = require('express');
var app = express();
var morgan = require('morgan');
var path    = require("path");
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bbTemplates');
var api = require('./app/controllers/api.js');
var login = require('./app/controllers/login.js');

var port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use("/api", api);
app.use("/authApi", login);
app.use("/", express.static(__dirname + "/app/views"));


app.listen(port);
console.log("Magic happens on port " + port);

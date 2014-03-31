// server functions
var http = require('http');
var express = require('express');
var partials = require('express-partials');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/client'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server now listening on port ' + port);
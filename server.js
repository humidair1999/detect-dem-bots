var path = require('path');
var express  = require('express');
// static file compression middleware
var compress = require('compression');
// middleware that allows you to parse request body, json, etc.
var bodyParser = require('body-parser');
// middleware to allow the general use of PUT and DELETE verbs
var methodOverride = require('method-override');
// logging middleware
var morgan  = require('morgan');
// middleware to return X-Response-Time with a response
var responseTime = require('response-time');
// middleware to serve a favicon prior to all other assets/routes
var favicon = require('serve-favicon');

var tsv = require("node-tsv-json");

var fs = require('fs')

var app = express();

var detectBots = require('./lib/detect-bots');

app.use(morgan('dev'));
app.use(responseTime());

app.use(bodyParser());
app.use(methodOverride());

app.use(compress());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/train', function(req, res) {
    tsv({
    input: "data/train_data.tsv", 
    output: "data/output.json",
    parseRows: true
  }, function(err, result) {
    if(err) {
      console.error(err);
    }else {
      console.log(result);

      res.json(result);
 
      //    [ 
      //      { 'date, 'close'}, 
      //      { '31-Jul-07', '131.76' }, 
      //      { '30-Jul-07', '141.43' }, 
      //      { '27-Jul-07', '143.85' }, 
      //      { '26-Jul-07', '146.00' }, 
      //      { '25-Jul-07', '137.26' }, 
      //      { '24-Jul-07', '134.89' }, 
      //      { '23-Jul-07', '143.70' }, 
      //      { '20-Jul-07', '143.75' } 
      //    ] 
    }
  });
});

app.get('/fake-request', function(req, res) {
    var botPoints = detectBots(req.query);

    console.log(botPoints);

    res.status(botPoints);
});

app.listen(process.env.PORT || 3000);

console.log('server started on port: ', process.env.PORT || 3000);
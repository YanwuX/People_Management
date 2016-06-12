// call the packages we need
var express = require('express');        // call express
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var infraFunct = require('./infrastructure/infrastructure')();
var empRouter = require('./routes/emp');

var app = express();                 // define our app using express

// connect to our database
mongoose.connect('mongodb://yanwuAdmin:yanwuPass@jello.modulusmongo.net:27017/enoHy8we');
// mongoose.connect('mongodb://peiwei@valiantica.com:valianticano1@proximus.modulusmongo.net:27017/qihytI4p');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '/public/views')));


var port = process.env.PORT || 8888;        // set our port
var router = express.Router();

// ROUTES FOR OUR API
// =============================================================================

// 2nd part
// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Initiating...');
//     next(); // make sure we go to the next routes and don't stop here
// });

/* GET users listing. */


// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
app.use('/API', empRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("server engaged, listening port: " + port);

var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var cors = require('cors');
var bodyParser = require('body-parser');
var beautifulUnique = require('mongoose-beautiful-unique-validation');

var port = process.env.PORT || 8000;
var routes = require('./config/routes');
var environment = app.get('env');

var databaseUri = require('./config/db')(environment);

mongoose.Promise = bluebird;
mongoose.connect(databaseUri);
mongoose.plugin(beautifulUnique);

// app.get('/*', function(req, res, next){ 
//   res.setHeader('Last-Modified', (new Date()).toUTCString());
//   next(); 
// });


if('test' !== environment) {
  app.use(morgan('dev'));
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', routes);

app.listen(port, function() {
  console.log("Express is listening on port " + port);
});

module.exports = app;
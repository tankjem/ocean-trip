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

if('test' !== environment) {
  app.use(morgan('dev'));
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', routes);

var server = app.listen(port, function() {
  console.log("Express is listening on port " + port);
});

var io = require("socket.io")(server);
var Twit = require("twit");
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = twitter.stream("statuses/filter", {track: ["whale", "dolphin", "seal"]});
io.on("connect", function(socket){
  stream.on("tweet", function(tweet){
    var data = {};
    data.name = tweet.user.name;
    data.text = tweet.text;
    data.user_profile_image = tweet.user.profile_image_url;
    socket.emit("tweets", data);
  });
});

module.exports = app;
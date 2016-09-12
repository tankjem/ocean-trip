var router = require('express').Router();
var authController = require('../controllers/authentications');
var githubController = require('../controllers/githubOauth');
var facebookController = require('../controllers/facebookOauth');
var twitterController = require('../controllers/twitterOauth');
var sightingsController = require('../controllers/sightings');

var router = require('express').Router();
var jwt = require('jsonwebtoken');
var secret = require('./tokens').secret;


function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;
    next();
  });
}

router.post('/oauth/github', githubController.login);
router.post('/oauth/twitter', twitterController.login);
router.post('/oauth/facebook', facebookController.login);
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/sightings', sightingsController.index);

module.exports = router;

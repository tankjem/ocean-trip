var request = require('request-promise');

function sightingsIndex(req, res) {

  request.get({
    url: "http://hotline.whalemuseum.org/api.json?limit=100",
    json: true
  })
  .then(function(data) {
    res.status(200).json(data);
  })
  .catch(function(err) {
    res.status(500).json(err);
  })
}

module.exports = {
  index: sightingsIndex
}
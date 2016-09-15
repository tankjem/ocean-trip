var request = require('request-promise');

function airportsIndex(req, res) {
  request.get({
    url: "https://airport.api.aero/airport/nearest/" + req.query.lat + "/" + req.query.lng,
    qs: {
      user_key: process.env.AIRPORT_API_KEY
    },
    json: true
  })
  .then(function(result) {
    return res.status(200).json(result);
  })
  .catch(function(err) {
    return res.status(400).json(err);
  });
}

module.exports = {
  index: airportsIndex
}
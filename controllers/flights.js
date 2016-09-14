var request = require('request-promise');

function flightsIndex(req,res){
  request.get({
    url: "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/UK/" + req.query.destination + "/anytime/anytime?apiKey=" + process.env.SKYSCANNER_API_KEY,
    json: true
  })
  .then(function(data){
    res.status(200).json(data);
  })
  .catch(function(err){
    res.status(500).json(err);
  })
}

module.exports = {
  index: flightsIndex
}

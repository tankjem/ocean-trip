var request = require('request-promise');

function flightsIndex(req,res){
  request.get({
    url: "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/GB/GBP/en-GB/" + req.query.origin + "/" + req.query.destination + "/anytime/anytime?apiKey=ge682354248198312882798730921087",
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

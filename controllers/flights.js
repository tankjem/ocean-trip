var request = require('request-promise');
var _ = require('underscore');

function flightsIndex(req,res){
  request.get({
    url: "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/UK/" + req.query.destination + "/anytime/anytime?apiKey=" + process.env.SKYSCANNER_API_KEY,
    json: true
  })
  .then(function(response){
    var quotes = response.Quotes;
    var places = response.Places;
    var carriers = response.Carriers;

    quotes = quotes.map(function(quote) {
      quote.OutboundLeg.Carriers = quote.OutboundLeg.CarrierIds.map(function(carrierId) {
        return _.findWhere(carriers, { CarrierId: carrierId });
      });

      quote.OutboundLeg.Origin = _.findWhere(places, { PlaceId: quote.OutboundLeg.OriginId });

      quote.OutboundLeg.Destination = _.findWhere(places, { PlaceId: quote.OutboundLeg.DestinationId });

      quote.InboundLeg.Carriers = quote.InboundLeg.CarrierIds.map(function(carrierId) {
        return _.findWhere(carriers, { CarrierId: carrierId });
      });

      quote.InboundLeg.Origin = _.findWhere(places, { PlaceId: quote.InboundLeg.OriginId });

      quote.InboundLeg.Destination = _.findWhere(places, { PlaceId: quote.InboundLeg.DestinationId });

      delete quote.OutboundLeg.CarrierIds;
      delete quote.OutboundLeg.OriginId;
      delete quote.OutboundLeg.DestinationId;

      delete quote.InboundLeg.CarrierIds;
      delete quote.InboundLeg.OriginId;
      delete quote.InboundLeg.DestinationId;
      
      return quote;
    });
    res.status(200).json(quotes);
  })
  .catch(function(err){
    res.status(500).json(err);
  })
}

module.exports = {
  index: flightsIndex
}

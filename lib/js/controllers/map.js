angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings", "Airports", "Flights", "$rootScope", "$window"];
function MapController(Sightings, Airports, Flights, $rootScope, $window) {
  var self = this;

  this.markers = [];
  this.destination = {};
  this.origin = {};
  this.trips = {};

  // window.navigator.geolocation.getCurrentPosition(function(position) {
  //   var currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };

  //   Airports.find(currentLocation)
  //     .then(function(airport){
  //       self.origin = airport;
  //     });

  // });

  $rootScope.$on('findAirports', function(e, location) {
    Airports.find(location)
      .then(function(airport){
        self.destination = airport;

        Flights.query(self.origin.code, self.destination.code)
          .then(function(data) {
            self.trips = data;
            for (var i = 0; i < self.trips.length; i++) {
              self.minPrice = data[i].MinPrice
              self.arrival = data[i].OutboundLeg.Destination
              self.departure = data[i].InboundLeg.Destination
              self.priceUpdatedAt = data[i].QuoteDateTime
              console.log(self.minPrice);
              console.log(self.arrival);
              console.log(self.departure);
              console.log(self.priceUpdatedAt);
            }
            console.log("trips", data[0]);
        });

      });
  });

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 0, lng: 0 };
}
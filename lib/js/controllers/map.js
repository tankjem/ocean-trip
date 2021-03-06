angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings", "Airports", "Flights", "$rootScope", "$window"];
function MapController(Sightings, Airports, Flights, $rootScope, $window) {
  var self = this;

  this.markers = [];
  this.destination = {};
  this.flights = [];
  // this.selectedFlight = null;

  this.deselectFlight = function() {
    this.flights = [];
  }

  $rootScope.$on('findAirports', function(e, location) {
    Airports.find(location)
      .then(function(airport){
        self.destination = airport;

        Flights.query(self.destination.code)
          .then(function(data) {
            self.flights = data;
            // console.log(data);
          });

      });
  });

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 36.518466, lng: -100.898438 };
}
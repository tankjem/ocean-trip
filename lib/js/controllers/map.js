angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings", "Airports", "Flights", "$rootScope", "$window"];
function MapController(Sightings, Airports, Flights, $rootScope, $window) {
  var self = this;

  this.markers = [];
  this.destination = {};
  this.origin = {};
  this.trip = {};

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
          // get fights from origin to destination
            // self.trip = data;
            console.log(data);
        });

      });
  });

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 0, lng: 0 };
}
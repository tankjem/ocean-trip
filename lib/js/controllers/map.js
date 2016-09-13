angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings","Airports", "$rootScope", "$window"];
function MapController(Sightings, Airports, $rootScope, $window) {
  var self = this;

  this.markers = [];
  this.destination = {};
  this.origin = {};

  window.navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };

    Airports.find(currentLocation)
      .then(function(airport){
        self.origin = airport;
      });

  });

  $rootScope.$on('findAirports', function(e, location) {
    Airports.find(location)
      .then(function(airport){
        self.destination = airport;
      })
      .then(function() {
        // get fights from origin to destination
      })
  });

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 0, lng: 0 };
}
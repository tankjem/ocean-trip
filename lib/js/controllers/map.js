angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings","Airports", "$rootScope"];
function MapController(Sightings, Airports, $rootScope) {
  var self = this;

  this.markers = [];
  this.airports = [];

  Airports.query()
    .then(function(data){
      self.airports = data;
      // console.log(data);
    });

  Sightings.query()
    .then(function(data) {
      self.markers = data;
      // console.log(data);
    });

  this.center = { lat: 0, lng: 0 };
}
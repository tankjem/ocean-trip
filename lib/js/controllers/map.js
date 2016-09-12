angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings", "$rootScope"];
function MapController(Sightings, $rootScope) {
  var self = this;

  this.markers = [];

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 0, lng: 0 };
}
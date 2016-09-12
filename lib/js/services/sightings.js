angular
  .module("OceanTripApp")
  .service("Sightings", Sightings);

Sightings.$inject = ["$http"];
function Sightings($http) {
  this.query = function() {
    return $http.get("/api/sightings")
      .then(function(res) {
        return res.data;
      });
  }
}
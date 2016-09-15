angular  
  .module("OceanTripApp")
  .service("Flights", Flights);

Flights.$inject = ["$http"];
function Flights($http) {
  this.query = function(destination){
    return $http.get("/api/flights?destination=" + destination)
    .then(function(res){
      return res.data;
    });
  }
}
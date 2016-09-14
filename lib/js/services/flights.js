angular  
  .module("OceanTripApp")
  .service("Flights", Flights);

Flights.$inject = ["$http"];
function Flights($http) {
  this.query = function(origin, destination){
    return $http.get("/api/flights?origin=" + origin + "&destination=" + destination)
    .then(function(res){
      return res.data;
      console.log(res.data);
    });
  }
}
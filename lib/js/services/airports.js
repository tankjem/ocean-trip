angular
  .module("OceanTripApp")
  .service("Airports", Airports);

Airports.$inject = ["$http"];
function Airports($http) {
  this.find = function(location){
    console.log(location);
    return $http({
      url: '/api/airports',
      params: { lat: location.lat, lng: location.lng }
    })
    .then(function(res){
      console.log(res);
      return res.data.airports[0];
    });
  }
}
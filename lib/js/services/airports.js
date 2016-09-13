angular
  .module("OceanTripApp")
  .service("Airports", Airports);

Airports.$inject = ["$http"];
function Airports($http) {
  this.find = function(location){
    return $http.get("https://airport.api.aero/airport/nearest/" + location.lat + "/" + location.lng + "?user_key=64012bc70e7cbbbe3ef239fadf379976")
      .then(function(res){
        return res.data.airports[0];
      });
  }
}
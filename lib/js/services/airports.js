angular
  .module("OceanTripApp")
  .service("Airports", Airports);

Airports.$inject = ["$http"];
function Airports($http) {
  this.query = function(){
    return $http.get("https://airport.api.aero/airport?user_key=64012bc70e7cbbbe3ef239fadf379976")
      .then(function(res){
        return res.data;
      });
  }
}
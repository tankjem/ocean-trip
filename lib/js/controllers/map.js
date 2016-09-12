angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

RegisterController.$inject = ["$scope"];
function MapController($scope) {
  var self = $scope ;

  self.createMap = function (){
    var latlng = new google.maps.LatLng(51.618017, -0.175781);
      var myOptions = {
          zoom: 5,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById("map"), myOptions); 
      $scope.overlay = new google.maps.OverlayView();
      $scope.overlay.draw = function() {}; // empty function required
      $scope.overlay.setMap($scope.map);
      $scope.element = document.getElementById("map");

  }
  self.createMap();
}
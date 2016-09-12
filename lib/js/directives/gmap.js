angular
  .module("OceanTripApp")
  .directive('gMap', gMap);

function gMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      markers: '='
    },
    link: function(scope, element) {

      var markers = [];

      if(!scope.center) throw new Error('You must have a center for your g-map!');

      var map = new google.maps.Map(element[0], {
        center: scope.center,
        zoom: 2
      });

      scope.$watch('markers.length', updateMarkers);

      function updateMarkers() {
        console.log(scope.markers);
        markers.forEach(function(marker) {
          marker.setMap(null);
        });

        markers = scope.markers.map(function(location) {
          var marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: map
          });

          marker.addListener('click', function() {
            console.log(location);
          });

          return marker;
        });
      }

    }
  }
}
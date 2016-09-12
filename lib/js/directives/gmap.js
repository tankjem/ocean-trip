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
        zoom: 2,
        styles: [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00BFFF"},{"saturation":6},{"lightness":8},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#679714"},{"saturation":33.4},{"lightness":-25.4},{"gamma":1}]
        }], disableDefaultUI: true
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
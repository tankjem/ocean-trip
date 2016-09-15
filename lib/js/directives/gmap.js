angular
  .module("OceanTripApp")
  .directive('gMap', gMap);

gMap.$inject = ['$rootScope'];
function gMap($rootScope) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      markers: '=',
      destination: '=',
      flights: '='
    },
    link: function(scope, element) {
      var markers = [];
      var airportMarker = null;
      var selectedMarker = null;

      var infoWindow = new google.maps.InfoWindow();

      if(!scope.center) throw new Error('You must have a center for your g-map!');

      var map = new google.maps.Map(element[0], {
        center: scope.center,
        zoom: 2,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#165c64"},{"saturation":34},{"lightness":-69},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#b7caaa"},{"saturation":-14},{"lightness":-18},{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#cbdac1"},{"saturation":-6},{"lightness":-9},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#8d9b83"},{"saturation":-89},{"lightness":-12},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#d4dad0"},{"saturation":-88},{"lightness":54},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#bdc5b6"},{"saturation":-89},{"lightness":-3},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#bdc5b6"},{"saturation":-89},{"lightness":-26},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#c17118"},{"saturation":61},{"lightness":-45},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#8ba975"},{"saturation":-46},{"lightness":-28},{"visibility":"on"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"hue":"#a43218"},{"saturation":74},{"lightness":-51},{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#3a3935"},{"saturation":5},{"lightness":-57},{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"hue":"#cba923"},{"saturation":50},{"lightness":-46},{"visibility":"on"}]
          }], disableDefaultUI: true
      });

      scope.$watchCollection('flights', openInfoWindow);

      function openInfoWindow() {
        if(scope.flights.length > 0) {
          var contentString =
          "<div id='infoWindow'>" +
          "<h1 id='firstHeading'>Whale Sighting</h1>"+
          "<h6>" +scope.markers[0].species +"</h6>" +
          "<p>" +scope.markers[0].location +"</p>" +
          "<p>" + scope.markers[0].description +"</p>" +
          "<small> Sighted At: " +scope.markers[0].sighted_at +"</small>" +
          "<br>" +
          "<h1 id='firstHeading'>Ocean Flights</h1>"+
          "<h5>Outbound Leg</h4>"+
          "<h6>Origin: "+ scope.flights[0].OutboundLeg.Origin.CityName +"</h6>"+
          "<h6>Destination: "+ scope.flights[0].OutboundLeg.Destination.CityName + "</h6>"+
          "<small>Departure Time: "+ scope.flights[0].OutboundLeg.DepartureDate +"</small>" +
          "<h5>Return Flight</h5>" +
          "<h6>Destination: "+ scope.flights[0].InboundLeg.Destination.CityName + "<h5>" +
          "<h6>Origin: "+ scope.flights[0].InboundLeg.Origin.CityName + "</h6>" +
          "<small>Departure Time: "+ scope.flights[0].InboundLeg.DepartureDate +"</small>"+
          "</div>";

          infoWindow.setContent(contentString);
          infoWindow.open(map, selectedMarker);
        }
      }

      scope.$watchCollection('markers', updateMarkers);
      scope.$watch('destination.code', updateAirport);
      // scope.$watch('trips.length');

      var markerclusterer = new MarkerClusterer(map, [], {
        minimumClusterSize: 5
      });

      function updateAirport(){
        if(airportMarker) {
          airportMarker.setMap(null);
        }
        if(scope.destination.code) {
          airportMarker = new google.maps.Marker({
            position: { lat: scope.destination.lat, lng: scope.destination.lng},
            map: map,
            icon: "http://ortambo-airport.com/images/map-icon-blue.svg"
          });
        }
      }

      function updateMarkers() {
        // console.log(scope.markers);
        markers.forEach(function(marker) {
          marker.setMap(null);
        });

        markers = scope.markers.map(function(location) {
            // console.log(location);

          var marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: map,
            icon: "http://iconizer.net/files/IconSweets_2/orig/whale.png"
          });

          marker.addListener('click', function() {
            console.log(location);
            $rootScope.$broadcast("findAirports", { lat: location.latitude, lng: location.longitude });
            selectedMarker = this;

          });

          markerclusterer.addMarker(marker);

          return marker;
        });
      }

    }
  }
}
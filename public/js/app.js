angular 
  .module("OceanTripApp", ["ngResource", "ui.router", "satellizer"])
  .constant("API_URL", "http://localhost:8000/api")
  .config(oAuthConfig)
  .config(Router);


oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  $authProvider.github({
    url: 'api/oauth/github',
    clientId: "6fe25ed2a59171b9d91a"
  });
  $authProvider.facebook({
    url: 'api/oauth/facebook',
    clientId: "1264473513585991"
  });

  $authProvider.twitter({
    url: 'api/oauth/twitter',
    clientId: " pXJ19cL851aYoRkiYKURZEVQ3"
  });

}

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl:'/templates/landing.html',
      controller: "LoginController as login"
    })
    .state('home', {
      url:'/home',
      templateUrl: 'templates/home.html',
    })
    .state('register', {
      url:'/register',
      templateUrl: 'templates/register.html',
      controller: "RegisterController as register"
    })
    .state('login', {
      url:'/login',
      templateUrl: 'templates/login.html',
      controller: "LoginController as login"
    })
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: "MapController as map"
    })
    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html'
    })
    .state('liveSightings', {
      url: '/liveSightings',
      templateUrl: 'templates/liveSightings.html',
      controller: 'LiveSightingsController as sightings'
    });
    
    $urlRouterProvider.otherwise('/');
}
angular
  .module("OceanTripApp")
  .controller("LiveSightingsController", LiveSightingsController);

LiveSightingsController.$inject = ["$window"]
function LiveSightingsController($window){

  var socket = $window.io();

  socket.on("connect", function(){
    console.log("connected");
  });

  socket.on("tweets", function(tweet){
    $('#tweets-stream').prepend('<div class="tweet"><img src="' + tweet.user_profile_image + '" class="avatar pull-left"/><div class="names"><span class="full-name">' + tweet.name + ' </span></div><div class="contents"><span class="text">' + tweet.text + '</span></div></div>');
       
       // console.log(tweet.text);
  });

}
angular
  .module("OceanTripApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth","$state", "$rootScope"];
function LoginController($auth, $state, $rootScope) {
  
  this.credentials = {};

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
        $state.go("home");
      });
  }

  this.submit = function submit() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
        $rootScope.$broadcast("loggedIn");
        $state.go('home');
    });
  }
}
angular
  .module("OceanTripApp")
  .controller("MainController", MainController);

MainController.$inject = ["$auth", "$state", "$rootScope"];
function MainController($auth, $state, $rootScope) {

  var self = this;

  this.currentUser = $auth.getPayload();

  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("landing");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });
}
angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings", "Airports", "Flights", "$rootScope", "$window"];
function MapController(Sightings, Airports, Flights, $rootScope, $window) {
  var self = this;

  this.markers = [];
  this.destination = {};
  this.flights = [];
  // this.selectedFlight = null;

  this.deselectFlight = function() {
    this.flights = [];
  }

  $rootScope.$on('findAirports', function(e, location) {
    Airports.find(location)
      .then(function(airport){
        self.destination = airport;

        Flights.query(self.destination.code)
          .then(function(data) {
            self.flights = data;
            console.log(data);
          });

      });
  });

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 36.518466, lng: -100.898438 };
}
angular
  .module("OceanTripApp")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["$auth", "$state", "$rootScope"];
function RegisterController($auth, $state, $rootScope) {

  this.user = {};

  this.submit = function() {
    $auth.signup(this.user, {
      url: '/api/register'
    })
    .then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go("home");
    })
  }
}
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
        zoom: 3,
        minZoom: 2,
        maxZoom: 24,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#165c64"},{"saturation":34},{"lightness":-69},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#b7caaa"},{"saturation":-14},{"lightness":-18},{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"hue":"#cbdac1"},{"saturation":-6},{"lightness":-9},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#8d9b83"},{"saturation":-89},{"lightness":-12},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#d4dad0"},{"saturation":-88},{"lightness":54},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#bdc5b6"},{"saturation":-89},{"lightness":-3},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#bdc5b6"},{"saturation":-89},{"lightness":-26},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#c17118"},{"saturation":61},{"lightness":-45},{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#8ba975"},{"saturation":-46},{"lightness":-28},{"visibility":"on"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"hue":"#a43218"},{"saturation":74},{"lightness":-51},{"visibility":"simplified"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#3a3935"},{"saturation":5},{"lightness":-57},{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"hue":"#cba923"},{"saturation":50},{"lightness":-46},{"visibility":"on"}]
          }], disableDefaultUI: true
      });

      scope.$watchCollection('flights', openInfoWindow);

      function openInfoWindow() {
        if(scope.flights.length > 0) {
          var contentString =
          "<div class='animated lightSpeedIn' id='infoWindow'>" +
          "<h1 id='firstHeading'>Whale Sighting</h1>"+
          "<h6>" +selectedMarker.location.species +"</h6>" +
          "<p>" +selectedMarker.location.location +"</p>" +
          "<p>" + selectedMarker.location.description +"</p>" +
          "<small> Sighted At: " +selectedMarker.location.sighted_at +"</small>" +
          "<br>" +
          "<br>" +
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

        scope.markers.forEach(function(location) {
            // console.log(scope.location);
          if(location.latitude != 0 && location.longitude != 0 ) {
            var marker = new google.maps.Marker({
              position: { lat: location.latitude, lng: location.longitude },
              map: map,
              icon: "http://iconizer.net/files/IconSweets_2/orig/whale.png",
              location: location
            });
            marker.addListener('click', function() {
              console.log(location);
              $rootScope.$broadcast("findAirports", { lat: location.latitude, lng: location.longitude });
              selectedMarker = this;

            });
            markerclusterer.addMarker(marker);

            markers.push(marker);
          }

          // markerclusterer.addMarker(marker);

          // return marker;
        });
      }

    }
  }
}
// angular
//   .module("OceanTripApp")
//   .factory("User", User);

// User.$inject = ["$resource", "API_URL"];
// function User($resource, API_URL) {
//   return $resource(API_URL + "/users", { id: '@_id' }, {
//     update: { method: "PUT" },
//     login: {method : "POST", url: API_URL + "/login"},
//     register: {method : "POST", url: API_URL + "/register"},
//   });
// }
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
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
    .state('home', {
      url: '/',
      templateUrl:'/templates/home.html',
      controller: "LoginController as login"
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
    });
    
    $urlRouterProvider.otherwise('/');
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
        $state.go("map");
      });
  }

  this.submit = function submit() {
    $auth.login(this.credentials, {
      url: "/api/login"
    }).then(function(){
        $rootScope.$broadcast("loggedIn");
        $state.go('map');
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
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });
}
angular
  .module("OceanTripApp")
  .controller("MapController", MapController);

MapController.$inject = ["Sightings", "$rootScope"];
function MapController(Sightings, $rootScope) {
  var self = this;

  this.markers = [];

  Sightings.query()
    .then(function(data) {
      self.markers = data;
    });

  this.center = { lat: 0, lng: 0 };
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
      $state.go("map");
    })
  }
}
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
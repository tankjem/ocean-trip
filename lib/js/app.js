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
    url: 'https://ocean-trip.herokuapp.com/api/oauth/facebook',
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
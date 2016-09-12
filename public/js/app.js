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
    $state.go("home");
  }

  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });
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
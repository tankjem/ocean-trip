angular 
  .module("OceanTripApp", ["ngResource", "ui.router", "satellizer", "angular-jwt"])
  .constant("API_URL", "http://localhost:8000/api")
  .config(oAuthConfig)
  .config(Router);


oAuthConfig.$inject = ["$authProvider"];
function oAuthConfig($authProvider) {
  $authProvider.github({
    url: '/oauth/github',
    clientId: "6fe25ed2a59171b9d91a"
  });

  $authProvider.facebook({
    url: '/oauth/facebook',
    clientId: "1264473513585991"
  });

}

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl:'/templates/home.html'
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

LoginController.$inject = ["User","$state", "$rootScope"];
function LoginController(User, $state, $rootScope) {

  this.credentials = {};

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        $rootScope.$broadcast("loggedIn");
        $state.go("home");
      });
  }

  this.submit = function submit() {
    User.login(this.credentials, function(res) {
      // console.log(res);
      $rootScope.$broadcast("loggedIn");
      $state.go("home");
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
angular
  .module("OceanTripApp")
  .factory("User", User);

User.$inject = ["$resource", "API_URL"];
function User($resource, API_URL) {
  return $resource(API_URL + "/users", { id: '@_id' }, {
    update: { method: "PUT" },
    login: {method : "POST", url: API_URL + "/login"},
    register: {method : "POST", url: API_URL + "/register"},
  });
}
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
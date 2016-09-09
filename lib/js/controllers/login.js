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
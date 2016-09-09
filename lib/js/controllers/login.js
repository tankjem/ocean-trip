angular
  .module("OceanTripApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["User","$state", "$rootScope"];
function LoginController(User, $state, $rootScope) {

  this.credentials = {};

  this.submit = function submit() {
    User.login(this.credentials, function(res) {
      // console.log(res);
      $rootScope.$broadcast("loggedIn");
      $state.go("dreams");
    });
  }
}
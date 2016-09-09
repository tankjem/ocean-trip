angular 
  .module("OceanTripApp", ["ngResource", "ui.router", "satellizer", "angular-jwt"])
  .constant("API_URL", "http://localhost:8000/api")
  .config(oAuthConfig)
  // .config(setupInterceptor)
  .config(Router);

// setupInterceptor.$inject = ["$httpProvider"];
// function setupInterceptor($httpProvider) {
//   return $httpProvider.interceptors.push("AuthInterceptor");
// } 

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
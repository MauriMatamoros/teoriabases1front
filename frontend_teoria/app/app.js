var app = angular.module('helpiApp', ['ui.router', 'ngStorage', 'helpiApp.Services', 'helpiApp.Controllers']);

angular.module('helpiApp.Controllers', []);
angular.module('helpiApp.Services', []);

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3xMlGqLsn8mjXRR7NkDa9MYCXkVu-JgM",
  authDomain: "test-auth-fe6f5.firebaseapp.com",
  databaseURL: "https://test-auth-fe6f5.firebaseio.com",
  storageBucket: "test-auth-fe6f5.appspot.com",
};
firebase.initializeApp(config);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/portfolio');
	$stateProvider
        .state('portfolio', {
            url: '/portfolio',
            templateUrl: '/views/portfolio.html'
        })
        .state('UC', {
            url: '/undercontruction',
            templateUrl: '/views/underConstruction.html'
        })
				.state('Login', {
            url: '/Login',
            templateUrl: '/views/login.html',
						controller: 'authController'
        })
				.state('Register', {
            url: '/Register',
            templateUrl: '/views/register.html',
						controller: 'authController'
        })
        .state('RegisterAdmin', {
            url: '/RegisterAdmin',
            templateUrl: '/views/registeradmin.html',
						controller: 'authController'
        })
				.state('Donante', {
            url: '/donante',
            templateUrl: '/views/donantView.html'
        })
        .state('Admin', {
            url: '/admin',
            templateUrl: '/views/admin.html'
        })
        .state('ManageCases', {
            url: '/ManageCases',
            templateUrl: '/views/managecases.html'
        })
				.state('Perfil', {
            url: '/donante/perfil',
            templateUrl: '/views/prefilView.html'
        })
}])

(function() {

	var TheyWorkForYouApp = angular.module('TheyWorkForYou', ['ngRoute','TheyWorkForYouControllers']);

	TheyWorkForYouApp.config(['$routeProvider',
	  function($routeProvider) {
		$routeProvider.
		  when('/', {
			templateUrl: 'index.html',
			controller: 'indexController'
		  }).
		  when('/msps/', {
			templateUrl: 'msps.html',
			controller: 'mspsController'
		  }).
		  when('/mlas/', {
			templateUrl: 'mlas.html',
			controller: 'mlasController'
		  }).
		  when('/lords/', {
			templateUrl: 'lords.html',
			controller: 'lordsController'
		  }).
		  otherwise({
			redirectTo: '/'
		  });
	}]);


})();
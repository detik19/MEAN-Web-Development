/**
 * http://usejsdoc.org/
 */
'use strict';

//configure the example modules routes
/*
 * use the angular.module() method to grab the example module 
 * and executed the config() method to create a new confguration block. 
 * 
 * Then, you applied DI to inject the $routeProvider object 
 * to your confguration function, and the $routeProvider.when() method to
 * define a new route. 
 */
angular.module('example').config(['$routeProvider', function($routeProvider) {
	//The first argument of the $routeProvider.when() method is the route's URL
	//the second one is an options object, where you defined your template's URL
	$routeProvider.when('/',{
		templateUrl:'example/views/example.client.view.html'
	})
	//use the $routeProvider.otherwise() method 
	//to defne the behavior of the router when 
	//the user navigates to an undefined URL
	.otherwise({
		redirectTo: '/'// simply redirected the user request to the route you defned before
	});
}]);
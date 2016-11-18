/**
 * http://usejsdoc.org/
 */
'use strict';
/*
 * 	First, you use the angular.module() method to retrieve the example module
 *  then you use the AngularJS module's controller() method to create 
 *  a new ExampleController constructor function
 *  
 *  In constructor function you applied the dependency injection to inject the $scope object
 *  Finally, you used the $scope object to define a name property, which will later
 *  be used by your view
 */
angular.module('example').controller('ExampleController',['$scope', function($scope) {
	$scope.name = 'MEAN Application';
}
]);
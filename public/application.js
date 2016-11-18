/**
 * http://usejsdoc.org/
 */
'use strict';
//set the main application name
var mainApplicationModuleName = 'mean';

//Create the main application
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'example']);

//Configure the hashbang URLs using the $locationProvider services 
mainApplicationModule.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
}
                              
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});
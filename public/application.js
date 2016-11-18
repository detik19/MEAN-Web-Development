/**
 * http://usejsdoc.org/
 */
'use strict';
//set the main application name
var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName, []);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});
/**
 * http://usejsdoc.org/
 */
'use strict';
/*
 * the service uses the $resource factory with three arguments: 
 * the base URL for the resource endpoints, 
 * a routing parameter assignment using the article's document _id feld, 
 * and an actions argument extending the resource methods with
 * an update() method that uses the PUT HTTP method
 */
angular.module('articles').factory('Articles',['$resource', function($resource) {
	// Use the '$resource' service to return an article '$resource' object
	return $resource('api/articles/:articleId', {
		articleId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);
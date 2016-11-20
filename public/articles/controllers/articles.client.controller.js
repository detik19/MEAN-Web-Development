/**
 *  ArticlesController is using four injected services:
 *  
 *  • $routeParams: This is provided with the ngRoute module and holds
 *    references to route parameters of the AngularJS routes you'll define next
 *  • $location: This allows you to control the navigation of your application
 *  • Authentication: You created this service in the previous chapter and it
 *    provides you with the authenticated user information
 *  • Articles: You created this service in the previous section and it provides
 *    you with a set of methods to communicate with RESTful endpoints
 */
'use strict';
angular.module('articles').controller('ArticlesController',
		['$scope','$routeParams','$location','Authentication','Articles', 
		 function($scope, $routeParams, $location, Authentication, Articles) {
			$scope.authentication = Authentication;

			// Create a new controller method for creating new articles
			$scope.create = function() {
				/*
				 *  use the title and content form felds, 
				 * 
				 */
				var article = new Articles({
					title: this.title,
					content: this.content
				});

				/*
				 *  and then ise the Articles resource service 
				 *  to create a new article resource
				 *  Use article resource $save() method to send the new article object
				 *  to the corresponding RESTful endpoint, along with two callbacks
				 *  
				 *  The first callback will be executed when the server responds 
				 *  with a success (200) status code . 
				 *  
				 *   It will then use the $location service to navigate to the route that will present the created article. 
				 *   
				 *   The second callback will be executed when the server responds with an error status code, 
				 *   marking a failed HTTP request. The callback will then assign the error message 
				 *   to the $scope object, so the view will be able to present it to the user.
				 */
				// Use the article '$save' method to send an appropriate POST request
				article.$save(function(response) {
					// If an article was created successfully, redirect the user to the article's page
					$location.path('articles/'+response._id);
				}, function(errorResponse) {
					// Otherwise, present the user with the error message
					$scope.error = errorResponse.data.message;
				});

			};
			// Create a new controller method for retrieving a list of articles
			$scope.find = function() {
				// Use the article 'query' method to send an appropriate GET request
				$scope.articles = Articles.query();

			};

			// Create a new controller method for retrieving a single article
			$scope.findOne = function() {
				// Use the article 'get' method to send an appropriate GET request
				$scope.article = Articles.get({
					articleId: $routeParams.articleId
				});
			};

			// Create a new controller method for updating a single article
			$scope.update = function() {
				// Use the article '$update' method to send an appropriate PUT request
				$scope.article.$update(function() {
					// If an article was updated successfully, redirect the user to the article's page 
					$location.path('articles/'+$scope.article._id);
				}, function(errorResponse) {
					// Otherwise, present the user with the error message
					$scope.error = errorResponse.data.message;
				});
			};

			// Create a new controller method for deleting a single article
			$scope.delete = function(article) {
				// If an article was sent to the method, delete it
				if(article){
					// Use the article '$remove' method to delete the article
					article.$remove(function() {
						// Remove the article from the articles list
						for(var i in $scope.articles){
							if($scope.articles[i] === article){
								$scope.articles.splice(i,1);
							}
						}
					});
				}else{
					// Otherwise, use the article '$remove' method to delete the article
					$scope.article.$remove(function() {
						$location.path('articles');
					});
				}
			};





		}]);

/**
 * http://usejsdoc.org/
 */
'use strict';
var users = require('../../app/controllers/users.server.controller'),
	articles= require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
	/*
	 *  notice how the POST method uses the users.requiresLogin() middleware
	 *  since a user need to log in before they can create a new article.
	 */
	app.route('/api/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);
	/*
	 *  users can only edit and delete the articles they created
	 */
	app.route('/api/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
	
	/*
	 * make sure every route that has the articleId parameter 
	 * will first call the articles.articleByID() middleware
	 */
	app.param('articleId', articles.articleByID);
};
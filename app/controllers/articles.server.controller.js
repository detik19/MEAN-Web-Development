/**
 * http://usejsdoc.org/
 */
'use strict';
var mongoose = require('mongoose'),
	Article = mongoose.model('Article');
/**
 * gets the Mongoose error object passed as an
 * argument then iterates over the errors collection 
 * and extract the frst message.
 */
var getErrorMessage = function(err) {
	if(err.errors){
		for(var errName in err.errors){
			if(err.errors[errName].message){
				return err.errors[errName].message;
			}
		}
	}else{
		return 'Unknown server error';
	}
};

/**
 * provide the basic functions to create a new article document
 */
exports.create = function(req, res) {
	//create a new Article model instance using the HTTP request body
	var article = new Article(req.body);
	//add the authenticated Passport user
	article.creator = req.user;
	
	//use the mongoose instance save() method to save the article document
	article.save(function(err) {
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(article);
		}
	});
};
/**
 * The list() method provide the basic functions 
 * to create a new article document
 * 
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, articles) {
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(articles);		
		}
	});
};

/**
 *  
 * 
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article) {
		if(err){
			 return next(err);
		}
		if(!article){
			return next(new Error('Failed to load article'+id));
		}
		req.article = article;
		next();
	});
};
/*
 *  update() method makes the assumption that you already 
 *  obtained the article object in the articleByID() middleware.
 */
exports.update = function(req, res) {
	var article = req.article;
	article.title = req.body.title;
	article.content = req.body.content;
	article.save(function(err) {
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(article);
		}
		
	});
};
//Create a new controller method that returns an existing article
exports.read = function(req, res) {
	res.json(req.article);
};

exports.delete = function(req, res) {
	var article = req.article;
	article.remove(function(err) {
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(article);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if(req.article.creator.id !== req.user.id){
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

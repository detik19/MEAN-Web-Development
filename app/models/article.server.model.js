/**
 * http://usejsdoc.org/
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//define a new ArticleSchema
var ArticleSchema= new Schema({
	created:{
		type: Date,
		default:Date.now
	},
	title:{
		type: String,
		default:'',
		trim: true,
		required:'Title cannot be blank '
	},
	content:{
		type: String,
		default:'',
		trim: true
	},
	creator:{
		type: Schema.ObjectId,
		ref: 'User'
	}
});

//Create the 'Article' model out of the 'ArticleSchema'
mongoose.model('Article', ArticleSchema);
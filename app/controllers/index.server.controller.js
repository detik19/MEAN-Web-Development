/**
 * http://usejsdoc.org/
 */
'use strict';
exports.render = function(req, res) {
//	if(req.session.lastVisit){
//		console.log(req.session.lastVisit);
//		//alert(req.session.lastVisit);
//	}
	
//	req.session.lastVisit = new Date();
	
	res.render('index',{
		title: 'Hello World',
		userFullName: req.user ? req.user.fullName : ''
	});
//	res.send('Hello world');
	
};
'use strict';

exports.render = function(req, res) {
	res.render('index', {
		accessToken: req.user && req.user.accessToken ? JSON.stringify(req.user.accessToken) : 'null',
		user: req.user && req.user.name ? JSON.stringify(req.user.name) : 'null',
		roles: req.user && req.user.roles ? JSON.stringify(req.user.roles) : JSON.stringify(['annonymous'])
	});
};
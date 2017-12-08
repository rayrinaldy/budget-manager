var mongoose = require("mongoose"),
	jwt = require("jsonwebtoken"),
	config = require("@config");

var api = {};

api.login = function(User) {
	//login method we first pass a User argument since we need our method to access our User model
	return function(req, res) {
		User.findOne({ username: req.body.username }, function(error, user) {
			if (error) throw error;

			if (!user)
				res.status(401).send({
					success: false,
					message: "Authentication failed. User not found."
				});
			else {
				user.comparePassword(req.body.password, function(
					error,
					matches
				) {
					if (matches && !error) {
						var token = jwt.sign({ user: user }, config.secret);
						res.json({
							success: true,
							message: "Token granted",
							token: token
						});
					} else {
						res.status(401).send({
							success: false,
							message: "Authentication failed. Wrong password."
						});
					}
				});
			}
		});
	};
};

// This method verifies the headers and gets the Authorization header
api.verify = function(headers) {
	if (headers && headers.authorization) {
		var split = headers.authorization.split(" ");
		if (split.length === 2) return split[1];
		else return null;
	} else return null;
};

module.exports = api;
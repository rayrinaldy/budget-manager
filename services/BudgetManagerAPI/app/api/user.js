var mongoose = require("mongoose");
var api = {};

// This setup method is just so we can create an admin account for debugging and should not exist in a production environment.

api.setup = function (User) {
	return function (req, res) {
		var admin = new User({
			username: "admin",
			password: "admin",
			clients: []
		});
		admin.save(function (error) {
			if (error) throw error;
			console.log("Admin account was succesfully set up");
			res.json({
				success: true
			});
		});
	};
};

api.index = function (User, BudgetToken) {
	return function (req, res) {
		var token = BudgetToken;
		if (token) {
			User.find({}, function (error, users) {
				if (error) throw error;
				res.status(200).json(users);
			});
		} else return res.status(403).send({
			success: false,
			message: "Unauthorized"
		});
	};
};

api.signup = function (User) {
	return function (req, res) {
		if (!req.body.username || !req.body.password) res.json({
			success: false,
			message: "Insert username and password."
		});else {
			var newUser = new User({
				username: req.body.username,
				password: req.body.password,
				clients: []
			});
			newUser.save(function (error) {
				if (error) return res.status(400).json({
					success: false,
					message: "Username already exists."
				});
				res.json({
					success: true,
					message: "Account created successfully"
				});
			});
		}
	};
};

module.exports = api;

// instantiate our User model and then get a user by matching the JWT token with the token got from the client

var PassportJWT = require("passport-jwt"),
	ExtractJWT = PassportJWT.ExtractJwt,
	Strategy = PassportJWT.Strategy,
	config = require("./config.js"),
	models = require("@BudgetManager/app/setup");

module.exports = function(passport) {
	var user = models.User;

	var params = {
		secretOrKey: config.secret,
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
	};

	passport.use(
		new Strategy(params, (payload, done) => {
			User.findOne({ id: payload.id }, (error, user) => {
				if (error) return done(error, false);

				if (user) {
					return done(null, user);
				} else {
					done(null, false);
				}
			});
		})
	);
};

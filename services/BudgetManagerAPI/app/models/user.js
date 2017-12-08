var mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

var Schema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	clients: [{}]
});

// generate a salt and hash our users passwords
Schema.pre('save', function(next) {
	var user = this;
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, (error, salt) => {
			if (error)
				return next(error);

			user.password = hash;
			next();
		});
	} else {
		return next();
	}
});

// add a function to compare passwords to check if the login attempt is valid or not

Schema.methods.comparePassword = (password, callback) => {
	bcrypt.compare(password, this.password, (error, matches) => {
		if (error)
			return callback(error);
		callback (null, matches);
	});
};

mongoose.model('User', Schema);
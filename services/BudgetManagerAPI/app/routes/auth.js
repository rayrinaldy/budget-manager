const models = require("@BudgetManager/app/setup");

// we pass our own app into it so we can set our routes,
// our const api is so we can access our auth.js file inside our api folder,
// we set the default route '/' to send the user “Budget Manager API”,
// and in our '/api/v1/auth' route (which is accessed by a POST request) 
// we use our login method, passing our User model as an argument.

module.exports = app => {
	const api = app.BudgetManagerAPI.app.api.auth;
	app.route("/").get((req, res) => res.send("Budget Manager API"));
	app.route("/api/v1/auth").post(api.login(models.User));
};
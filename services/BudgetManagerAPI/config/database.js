module.exports = (mongoose, config) => {
	const database = mongoose.connection;
	mongoose.Promise = Promise;

	mongoose.connect(config.database, {
		useMongoClient: true,
		promiseLibrary: global.Promise
	});

	database
		.on('error', error => console.log(`Connection to BudgetManager database failed: ${error}`))
		.on('connected', () => console.log('Connected to BudgetManager database'))
		.on('disconnected', () => console.log('Disconnected from BudgetManager database'));

	process.on('SIGINT', () => {
		database.close(() => {
			console.log('BudgetManager terminated');
			process.exit(0);
		});
	});
};

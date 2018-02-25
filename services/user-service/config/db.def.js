var dbSettings = {
	hostname: 'localhost',
	database: 'users_db',
	user: 'root',
	pass: 'root',
	dialect: 'mysql',
	debug: true,
}

var getConfig = () => {
	try {
		var configMod = require('./db.mod');
		dbSettings = Object.assign(dbSettings, configMod);
	} catch (ex) {
		//
	}
	return dbSettings;
}

module.exports = getConfig;
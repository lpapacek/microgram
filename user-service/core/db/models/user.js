var Sequelize = require('sequelize');

module.exports = (sequelize) => {
	const user = sequelize.define('user', {
		user_id: {
			type: Sequelize.INTEGER,
			field: 'user_id',
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: Sequelize.STRING,
			field: 'username',
		},
		password: {
			type: Sequelize.STRING,
			field: 'password',
		},
		first_name: {
			type: Sequelize.STRING,
			field: 'first_name',
		},
		last_name: {
			type: Sequelize.STRING,
			field: 'last_name',
		},
		created_at: {
			type: Sequelize.DATE,
			field: 'created_at',
			defaultValue: Sequelize.NOW,
		},
		updated_at: {
			type: Sequelize.DATE,
			field: 'updated_at',
			defaultValue: Sequelize.NOW,
		},
	});

	user.associate = (models) => {
		user.belongsTo(models.user, {
			foreignKey: 'created_by',
		})
	}

	return user;
}
'use strict';

const dbm = require('../core/db/dbManager');

const STATUSES = {
	PENDING: 0,
	ACTIVE: 1
};

const list = async (req, res, next) => {
	let users = await dbm.entities.user.findAll({
		where: {
			deleted: 0,
			status: STATUSES.ACTIVE
		}
	});
	res.body = {
		result: users
	};
	next();
};

const getById = async (req, res, next) => {
	let id = req.body.id;
	let user = await dbm.entities.user.findOne({
		where: {
			deleted: 0,
			status: STATUSES.ACTIVE,
			id: id
		}
	});
	res.body = {
		result: user
	};
	next();
};

module.exports = { list, getById };

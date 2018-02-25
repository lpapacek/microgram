'use strict';

const handleResponse = (req, res, next) => {
	if (!res.body) {
		// 404
		next();
		return;
	}

	if (res.body.error || res.body.error != null) {
		let err = new Error('Internal error');
		err.status = 500;
		next(err);
		return;
	}
	console.log(res.body);
	res.json(res.body);
};

module.exports = { handleResponse };

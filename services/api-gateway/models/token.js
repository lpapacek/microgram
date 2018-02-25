const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	user_id: { 
			type: Number, 
			required: true, 
			unique: true 
	},
	refresh_token: { 
			type: String, 
			required: true 
	},
	updated_at: Date,
	created_at: Date
})

schema.pre('save', function(next) {
	var now = Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
})

const Token = mongoose.model('token', schema);
module.exports = Token;
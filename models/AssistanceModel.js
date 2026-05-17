const { Schema, model } = require('mongoose');

const AssistanceSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	channelId: {
		type: String,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true
	},
	claimedBy: {
		type: String,
		default: null
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = model('Assistance', AssistanceSchema);

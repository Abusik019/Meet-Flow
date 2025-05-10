const mongoose = require('mongoose');

const SnapshotSchema = new mongoose.Schema(
	{
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		history: {
			type: Object, 
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Snapshot', SnapshotSchema);

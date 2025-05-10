const Snapshot = require('../models/snapshotModel');

exports.saveBoard = async (req, res) => {
	const { snapshot, authorId } = req.body;

	if (!snapshot || !authorId) {
		return res.status(400).json({ message: 'Missing snapshot or authorId' });
	}

	try {
		const updatedSnapshot = await Snapshot.findOneAndUpdate(
			{ authorId }, 
			{ history: snapshot }, 
			{
				new: true,       
				upsert: true,     
				setDefaultsOnInsert: true 
			}
		);

		res.status(200).json({
			message: 'Snapshot saved',
			snapshotId: updatedSnapshot._id,
			createdAt: updatedSnapshot.createdAt,
		});
	} catch (error) {
		console.error('Error saving snapshot:', error);
		res.status(500).json({ message: 'Failed to save snapshot' });
	}
};


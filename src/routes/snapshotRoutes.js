const express = require('express');
const router = express.Router();
const { saveBoard } = require('../controllers/snapshotController');

router.post('/save-board', saveBoard);

module.exports = router;
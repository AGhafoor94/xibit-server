const express = require('express');

const router = express.Router();

const getXibits = (req, res) => {
  res.send('All xibits');
};
const getXibit = (req, res) => {
  res.send('Get 1 xibit');
};

router.post('/xibits', getXibits);
router.get('/xibits/:id', getXibit);

module.exports = router;

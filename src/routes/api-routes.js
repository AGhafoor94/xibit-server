import express from 'express';

const router = express.Router();

const getXibits = (req, res) => {
  res.send('All xibits');
};
const getXibit = (req, res) => {
  res.send('Get 1 xibit');
};

const getAllPlans = (req, res) => {
  res.send('Get All');
};
const updatePlan = (req, res) => {
  res.send('Update one');
};
const addPlans = (req, res) => {
  res.send('Add Plans');
};
const deletePlans = (req, res) => {
  res.send('Delete Plans');
};

router.post('/xibits', getXibits);
router.get('/xibits/:id', getXibit);

router.get('/plans', getAllPlans);
router.put('/plans/:id', updatePlan);
router.post('/plans', addPlans);
router.delete('/plans/:id', deletePlans);

export default router;

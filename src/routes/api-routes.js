import express from 'express';
import db from '../models';

const router = express.Router();

const getXibits = (req, res) => {
  res.send('All xibits');
};
const getXibit = (req, res) => {
  res.send('Get 1 xibit');
};

const getAllPlans = async (req, res) => {
  const data = await db.Plan.find({});
  res.json(data);
};
const addPlans = (req, res) => {
  res.send('Add Plans');
};
const updatePlan = (req, res) => {
  res.send('Update one');
};
const deletePlans = (req, res) => {
  res.send('Delete Plans');
};

router.post('/xibits', getXibits);
router.get('/xibits/:id', getXibit);

router.get('/plans', getAllPlans);
router.post('/plans', addPlans);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlans);

export default router;

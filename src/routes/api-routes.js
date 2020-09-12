import express from 'express';
import db from '../models';

const router = express.Router();

const getXibits = (req, res) => {
  res.send('All xibits');
};
const getXibit = (req, res) => {
  res.send('Get 1 xibit');
};

const getAllPlans = async (_, res) => {
  try {
    const data = await db.Plan.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.Plan.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addPlans = (req, res) => {
  res.send('Add Plans');
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const content = req.body;
    const data = await db.Plan.findOneAndUpdate(id, content, { upsert: true });
    res.status(202).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePlans = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.Plan.findByIdAndDelete(id);
    res.status(202).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

router.post('/xibits', getXibits);
router.get('/xibits/:id', getXibit);

router.get('/plans', getAllPlans);
router.get('/plans/:id', getPlanById);
router.post('/plans', addPlans);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlans);

export default router;

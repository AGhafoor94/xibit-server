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
  try {
    const { id } = req.user;
    console.log(req.user);
    const data = await db.Plan.find({ userId: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.Plan.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPlans = async (req, res) => {
  try {
    const content = req.body;
    const data = await db.Plan.create(content);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const content = req.body;
    const data = await db.Plan.findByIdAndUpdate(id, content, { upsert: true });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.Plan.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

router.post('/xibits', getXibits);
router.get('/xibits/:id', getXibit);

router.get('/plans', getAllPlans);
router.get('/plans/:id', getPlanById);
router.post('/plans', addPlans);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);

export default router;

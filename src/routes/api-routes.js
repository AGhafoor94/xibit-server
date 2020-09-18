import express from 'express';
import axios from 'axios';
import db from '../models';

const router = express.Router();

const getXibits = (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getXibit = (req, res) => {
  res.send('Get 1 xibit');
};
const BASE_PLACE_URL =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=';
const LOCATION = 'UnitedKingdom';
const FIELDS =
  'fields=photos,formatted_address,name,rating,opening_hours&radius=1000';
const TYPE = 'aquarium';
const INPUT_TYPE = 'inputtype=textquery';
const { API_KEY } = process.env.API_KEY;

const getAquariums = async (req, res) => {
  try {
    const { data } = axios.get(
      `${BASE_PLACE_URL}${TYPE}%20${LOCATION}&${INPUT_TYPE}&${FIELDS}&key=${API_KEY}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSafaris = (req, res) => {};

const getAllPlans = async (req, res) => {
  try {
    const { id } = req.user;
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
router.post('/xibits/aquariums', getAquariums);
router.post('/xibit/safaris', getSafaris);

router.get('/plans', getAllPlans);
router.get('/plans/:id', getPlanById);
router.post('/plans', addPlans);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);

export default router;

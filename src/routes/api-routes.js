import express from 'express';
import axios from 'axios';
import db from '../models';

const router = express.Router();

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=zoo&UnitedKingdom&fields=photos,formatted_address,name,rating,opening_hours&radius=1000&inputtype=textquery&key=

const BASE_PLACE_URL =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const LOCATION = 'zoo';
const FIELDS = 'photos,formatted_address,name,rating,opening_hours';
const INPUT_TYPE = 'textquery';
const RADIUS = 1000;
const API_KEY =
  process.env.API_KEY || 'AIzaSyB2VpoZkMcQbJjNcmvcVuUIJ45-egrzbOg';

const getAquariums = async (req, res) => {
  try {
    const dataTransform = (placeArray) =>
      placeArray.map((place) => ({
        name: place.name,
        address: place.formatted_address,
      }));

    const { data } = await axios.get(BASE_PLACE_URL, {
      params: {
        input: LOCATION,
        inputtype: INPUT_TYPE,
        fields: FIELDS,
        raduis: RADIUS,
        key: API_KEY,
      },
    });
    console.log(data);
    const results = dataTransform(data.candidates);

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSafaris = (req, res) => {
  try {
    const { data } = axios.get(
      `${BASE_PLACE_URL}safari&${LOCATION}${INPUT_TYPE}${FIELDS}&key=${API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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

router.get('/xibits/aquariums', getAquariums);
router.get('/xibits/safaris', getSafaris);

router.get('/plans', getAllPlans);
router.get('/plans/:id', getPlanById);
router.post('/plans', addPlans);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);

export default router;

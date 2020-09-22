import express from 'express';
import axios from 'axios';
import db from '../models';

const router = express.Router();

const BASE_PLACE_URL =
  'https://maps.googleapis.com/maps/api/place/textsearch/json';
const RADIUS = 1000;
const API_KEY =
  process.env.API_KEY || '';
const PHOTO_BASE_URL = 'https://maps.googleapis.com/maps/api/place/photo';

const getAquariums = async (req, res) => {
  const QUERY = 'aquarium+in+UnitedKingdom';

  try {
    const dataTransform = (placeArray) =>
      placeArray.map((place) => ({
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        id: place.place_id,
        photos: place.photos,
        openingHours: place.opening_hours,
      }));

    const { data } = await axios.get(BASE_PLACE_URL, {
      params: {
        query: QUERY,
        raduis: RADIUS,
        key: API_KEY,
      },
    });
    const queryResults = dataTransform(data.results);

    res.status(200).json({ queryResults });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getSafaris = async (req, res) => {
  const QUERY = 'safari+in+UnitedKingdom';

  try {
    const dataTransform = (placeArray) =>
      placeArray.map((place) => ({
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        id: place.place_id,
        photos: place.photos,
        openingHours: place.opening_hours,
      }));

    const { data } = await axios.get(BASE_PLACE_URL, {
      params: {
        query: QUERY,
        raduis: RADIUS,
        key: API_KEY,
      },
    });

    const queryResults = dataTransform(data.results);
    res.status(200).json({ queryResults });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const searchXibit = async (req, res) => {
  try {
    const { type, search } = req.params;
    console.log(type);
    console.log(search);

    if (type === 'zoo') {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
          params: {
            input: type,
            inputtype: 'textquery',
            raduis: RADIUS,
            key: API_KEY,
          },
        }
      );
      res.status(200).json(data);
    } else {
      const result = await axios.get(
        `https://api.postcodes.io/postcodes/${search}`
      );
      console.log(result);
      const lat = result.latitude;
      const lng = result.longitude;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${type}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:${lat},${lng}&key=${API_KEY}`
      );
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getXibit = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${id}&key=${API_KEY}`
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
    const { id } = req.user;
    const data = await db.Plan.create({ ...content, userId: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const content = req.body;

    const model = await db.Plan.findById(id);
    model.xibits.push(content);
    const newData = await model.save();

    res.status(200).json({
      success: true,
      newData,
    });
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

router.get('/xibit/:id', getXibit);
router.get('/xibit/:type/search/:search', searchXibit);

router.get('/plans', getAllPlans);
router.get('/plans/:id', getPlanById);
router.post('/plans', addPlans);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);

export default router;

const mongoose = require('mongoose');

const db = require('../models');

const { DB_URI, MONGOOSE_OPTIONS } = require('../config/config');
mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

const seed = [
  {
    placeId: 'Place Id',
    name: 'Xibit Attraction',
    createdAt: Date.now(),
    address: 'somewhere',
    image: 'url',
    rating: 'good',
    review: 'good',
    mapUrl: 'good',
  },
  {
    placeId: 'Place Id 2',
    name: 'Xibit Attraction',
    createdAt: Date.now(),
    address: 'somewhere',
    image: 'url',
    rating: 'good',
    review: 'good',
    mapUrl: 'good',
  },
];

db.Xibits.deleteMany({}).then(() => {
  console.log('All seed data delete success');
  db.Xibits.collection
    .insertMany(seed)
    .then((data) => {
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
});

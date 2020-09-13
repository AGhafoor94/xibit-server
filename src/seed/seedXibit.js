import mongoose from 'mongoose';

import db from '../models';

import { DB_URI, MONGOOSE_OPTIONS } from '../config/config';

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
    userId: '',
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
    userId: '',
  },
];

db.Xibit.deleteMany({}).then(() => {
  db.Xibit.collection
    .insertMany(seed)
    .then((data) => {
      console.log(`${data.result.n} records inserted!`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

import mongoose from 'mongoose';

import db from '../models';

import { DB_URI, MONGOOSE_OPTIONS } from '../config/config';

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

const seed = [
  {
    title: 'Plan 1',
    xibits: [],
    createdAt: Date.now(),
    userId: '',
  },
  {
    title: 'Plan 2',
    xibits: [],
    createdAt: Date.now(),
    userId: '',
  },
];

db.Plan.deleteMany({}).then(() => {
  db.Plan.collection
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

const mongoose = require('mongoose');

const db = require('../models');

const { DB_URI, MONGOOSE_OPTIONS } = require('../config/config');

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

const seed = [
  {
    title: 'Plan 1',
    xibits: [],
    createdAt: Date.now(),
  },
  {
    title: 'Plan 2',
    xibits: [],
    createdAt: Date.now(),
  },
];

db.Plan.deleteMany({}).then(() => {
  db.Plan.collection
    .insertMany(seed)
    .then(() => {
      process.exit(0);
    })
    .catch(() => {
      process.exit(1);
    });
});

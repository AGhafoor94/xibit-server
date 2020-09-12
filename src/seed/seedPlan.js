const mongoose = require('mongoose');

const db = require('../models');

const { DB_URI, MONGOOSE_OPTIONS } = require('../config/config');

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

const seed = [
  {
    email: 'aghafoor',
    password: 'Work1',
  },
  {
    email: 'Happy',
    password: 'Check1',
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

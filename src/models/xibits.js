const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  placeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  mapUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Xibits = mongoose.model('Xibits', schema);

module.exports = Xibits;

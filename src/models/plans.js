import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  xibits: [
    {
      placeId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    req: true,
  },
});

const Plans = mongoose.model('Plans', schema);
export default Plans;

import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  xibits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'xibits',
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
});

export const Plans = mongoose.model('Plans', schema);

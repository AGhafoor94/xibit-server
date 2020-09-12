const bycrpt = require('bcryptjs');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const SALT = bycrpt.genSaltSync(10);

const schema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

schema.pre('save', (next) => {
  const user = this;

  if (!user.isModified('password')) return next();

  bycrpt.genSalt(SALT, (err, salt) => {
    if (err) return next(err);
    bycrpt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      return next();
    });
  });
});

schema.methods.comparePassword = (candidatePassword, cb) => {
  bycrpt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};
const User = mongoose.model('User', schema);

module.exports = User;

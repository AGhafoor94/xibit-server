const PORT = process.env.PORT || 3001;

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/xibit';

const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

module.exports = {
  PORT,
  DB_URI,
  MONGOOSE_OPTIONS,
};

export const PORT = process.env.PORT || 3001;

export const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/xibit';

export const AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret';

export const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

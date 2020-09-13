import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import apiRoutes from './routes/api-routes';
import userAuth from './routes/auth-routes';
import { PORT, DB_URI, MONGOOSE_OPTIONS } from './config/config';
import authenticateUser from './middleware/authentication';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// routes
app.use('/auth', userAuth);
// Free routes will go here e.g. html routes
// Authenticate users here
app.use('/api', authenticateUser, apiRoutes);

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

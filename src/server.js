const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api-routes.js');

const { PORT, DB_URI, MONGOOSE_OPTIONS } = require('./config/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api', apiRoutes);

app.use(cors());

mongoose.connect(DB_URI, MONGOOSE_OPTIONS);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

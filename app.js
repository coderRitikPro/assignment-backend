const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/disasters', require('./routes/disasters'));
app.use('/geocode', require('./routes/geocode'));
app.use('/disasters', require('./routes/resources'));
app.use('/disasters', require('./routes/mockSocialMedia'));
app.use('/disasters', require('./routes/officialUpdates'));
app.use('/disasters', require('./routes/imageVerify'));

module.exports = app;

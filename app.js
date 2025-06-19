const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authenticate = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(cors(
  {
    origin:'https://assignment-frontend-gilt.vercel.app/',
    credentials:true
  }
));

app.options('*', cors());
app.use(bodyParser.json());
app.use(authenticate);


app.use('/disasters', require('./routes/disasters'));
app.use('/geocode', require('./routes/geocode'));
app.use('/disasters', require('./routes/resources'));
app.use('/disasters', require('./routes/mockSocialMedia'));
app.use('/disasters', require('./routes/officialUpdates'));
app.use('/disasters', require('./routes/imageVerify'));

app.use('/',require('./routes/index.js'))

module.exports = app;

const serverless = require('serverless-http');
const app = require('../app'); // adjust path if needed

module.exports = serverless(app);

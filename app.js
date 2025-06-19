const express = require('express');
const http = require('http');
// const socketIO = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(bodyParser.json());


app.use('/disasters', require('./routes/disasters'));
app.use('/geocode', require('./routes/geocode'));
app.use('/disasters', require('./routes/resources'));
app.use('/disasters', require('./routes/mockSocialMedia'));
app.use('/disasters', require('./routes/officialUpdates'));
app.use('/disasters', require('./routes/imageVerify'));
// app.set('io', io);



// require('./websockets')(io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



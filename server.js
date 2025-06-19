
const http = require('http');
const socketIO = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = socketIO(server);


app.set('io', io);


require('./websockets')(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running locally on http://localhost:${PORT}`);
});

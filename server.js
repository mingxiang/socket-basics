const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

app.use(express.static(__dirname + '/public'));

let clientInfo = {};

io.on('connection', socket => {
  console.log('User connected via socket.io!');

  socket.on('joinRoom', req => {
    clientInfo[socket.id] = req;
    socket.join(req.room);
    socket.broadcast.to(req.room).emit('message',{
      name: 'System',
      text: `${req.name} has joined!`,
      timestamp : moment().valueOf()
    }); // people in this room see the message
  });

  socket.on('message', message => {
      console.log(`Message received: ${message.text}`)
      message.timestamp = moment().valueOf();
      io.to(clientInfo[socket.id].room).emit('message', message);
      //socket.broadcast.emit('message',message);
  });

  socket.emit('message', {
    name : "System",
    text : "Welcome to the chat application!",
    timestamp : moment().valueOf()
  });
});

http.listen(PORT, () => {
  console.log('Server started!');
});

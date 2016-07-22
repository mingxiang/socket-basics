const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log('User connected via socket.io!');

  socket.on('message', message => {
      console.log(`Message received: ${message.text}`)

      io.emit('message', message);
      //socket.broadcast.emit('message',message);
  });

  socket.emit('message', {
    text : "Welcome to the chat application!"
  })
})

http.listen(PORT, () => {
  console.log('Server started!');
})

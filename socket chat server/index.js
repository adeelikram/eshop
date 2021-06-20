

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['*']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});


io.on('connection', function (socket) {
  console.log('A user connected');
  socket.on('typing', function (data) {
    io.sockets.emit('typer', { user: data.user });
  })
  socket.on("stopping", (data) => {
    io.sockets.emit("stopped", { user: data.user })
  })
  socket.on("online", (data) => {
    io.sockets.emit("receiverOnline", { user: data.user })
  })
  socket.on("i_am_also",(data)=>{
    io.sockets.emit("ok",{user:data.user})
  })
  socket.on("going", (data) => {
    io.sockets.emit("gone", { user: data.user })
  })
});




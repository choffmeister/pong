var app = require('express')(),
  browserify = require('browserify-middleware'),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  logic = require('./logic'),
  timer = require('./timer').server(),
  utils = require('./utils');

app.get('/', function(req, res) { res.sendFile(__dirname + '/index.html'); });
app.get('/client.js', browserify(__dirname + '/client.js'));

var state = logic.init();
var loop = function () {
  var delta = timer.delta();

  state = logic.update(state, delta);
  io.emit('state', state.toJS());

  setTimeout(loop, 1000 / 60);
};
loop();

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

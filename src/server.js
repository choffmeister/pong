var app = require('express')(),
  browserify = require('browserify-middleware'),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  logic = require('./logic'),
  utils = require('./utils');

app.get('/', function(req, res) { res.sendFile(__dirname + '/index.html'); });
app.get('/client.js', browserify(__dirname + '/client.js'));

var state = logic.init();
var loop = function (last) {
  var curr = utils.now();
  var delta = curr - last;

  state = logic.update(state, delta);
  io.emit('state', state.toJS());

  setTimeout(function () { loop(curr); }, 1000 / 60);
};
loop(utils.now());

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

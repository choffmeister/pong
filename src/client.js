var Immutable = require('immutable'),
  io = require('socket.io-client')(),
  logic = require('./logic'),
  renderer = require('./renderer'),
  timer = require('./timer').client(),
  utils = require('./utils');

var Client = function (container, state) {
  var canvas = document.createElement('canvas');
  container.appendChild(canvas);

  state = state || logic.init();

  var loop = function () {
    var delta = timer.delta();

    state = logic.update(state, delta);
    renderer.render(canvas, container.offsetWidth, container.offsetHeight, state);

    window.requestAnimationFrame(loop);
  };

  io.on('state', function (newState) {
    state = Immutable.fromJS(newState);
  });

  loop();
};

module.exports = Client;
window.Client = Client;

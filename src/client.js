var Immutable = require('immutable'),
  io = require('socket.io-client')(),
  logic = require('./logic'),
  renderer = require('./renderer'),
  utils = require('./utils');

var Client = function (container, state) {
  var canvas = document.createElement('canvas');
  container.appendChild(canvas);

  state = state || logic.init();

  var loop = function (last) {
    var curr = utils.now();
    var delta = curr - last;

    state = logic.update(state, delta);
    renderer.render(canvas, container.offsetWidth, container.offsetHeight, state);

    window.requestAnimationFrame(function () { loop(curr); });
  };

  io.on('state', function (newState) {
    state = Immutable.fromJS(newState);
  });

  loop(utils.now());
};

module.exports = Client;
window.Client = Client;

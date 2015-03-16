var interpolate = require('./utils').interpolate;

var thickness = 16;
var length = 128;

var render = function (canvas, width, height, state) {
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');

  // boundaries
  ctx.fillRect(0, 0, width, height);
  ctx.clearRect(thickness, thickness, width - thickness * 2, height - thickness * 2);

  // player 1
  var p1pos = interpolate(thickness * 2 + length / 2, height - thickness * 2 - length / 2, state.getIn(['player1', 'position']));
  ctx.fillRect(thickness * 2, p1pos - length / 2, thickness, length);

  // player 2
  var p2pos = interpolate(thickness * 2 + length / 2,height - thickness * 2 - length / 2, state.getIn(['player2', 'position']));
  ctx.fillRect(width - thickness * 3, p2pos - length / 2, thickness, length);

  // ball
  var ballx = interpolate(thickness, width - thickness, state.getIn(['ball', 'position', 'x']));
  var bally = interpolate(thickness, height - thickness, state.getIn(['ball', 'position', 'y']));
  ctx.fillRect(ballx - thickness / 2, bally - thickness / 2, thickness, thickness);
};

module.exports = {
  render: render
};

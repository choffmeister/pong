var Immutable = require('immutable'),
  utils = require('./utils');

var init = function () {
  return Immutable.fromJS({
    id: utils.uuid(),
    duration: 0,
    player1: {
      position: 0.5,
      score: 0
    },
    player2: {
      position: 0.5,
      score: 0
    },
    ball: {
      position: {
        x: 0.5,
        y: 0.5
      },
      velocity: {
        x: Math.sign(Math.random() - 0.5) / 4,
        y: Math.random() - 0.5 / 4
      }
    }
  });
};

var update = function (state, delta) {
  var ball = state.get('ball').toJS();

  ball.position.x += ball.velocity.x * delta / 1000;
  ball.position.y += ball.velocity.y * delta / 1000;

  if (ball.position.x < 0) {
    ball.position.x *= -1;
    ball.velocity.x *= -1;
  }

  if (ball.position.x > 1) {
    ball.position.x -= ball.position.x - 1;
    ball.velocity.x *= -1;
  }

  if (ball.position.y < 0) {
    ball.position.y *= -1;
    ball.velocity.y *= -1;
  }

  if (ball.position.y > 1) {
    ball.position.y -= ball.position.y - 1;
    ball.velocity.y *= -1;
  }

  return state.set('ball', Immutable.fromJS(ball));
};

module.exports = {
  init: init,
  update: update
};


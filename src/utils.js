var uuid = function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var now = function () {
  return (new Date()).getTime();
};

var interpolate = function (a, b, lambda) {
  return a * (1 - lambda) + b * lambda;
};

module.exports = {
  uuid: uuid,
  now: now,
  interpolate: interpolate
};
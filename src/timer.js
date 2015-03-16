var ServerTimer = function () {
  var now = function () {
    var t = process.hrtime();
    return t[0] + t[1] * 1e-9;
  };

  var last = now();

  var delta = function () {
    var curr = now();
    var result = curr - last;
    last = curr;
    return result;
  };

  return {
    now: now,
    delta: delta
  };
};

var ClientTimer = function () {
  var now = function () {
    return (new Date()).getTime() / 1000;
  };

  var last = now();

  var delta = function () {
    var curr = now();
    var result = curr - last;
    last = curr;
    return result;
  };

  return {
    now: now,
    delta: delta
  };
};

module.exports = {
  server: ServerTimer,
  client: ClientTimer
};

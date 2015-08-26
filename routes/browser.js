var router = require('express').Router();

var counter = 0;

router.get('/reload', function (req, res, next) {
  res.json(++counter);
});

router.get('/timeout/:ms', function (req, res, next) {
  var timeInMs = 10;
  try {
    timeInMs = parseInt(req.params.ms, 10);
  } catch (e) {
    return next(e);
  }
  setTimeout(function () {
    res.send(true);
  }, timeInMs);
});

router.get('/header', function (req, res, next) {
  res.send(req.get(req.query.name));
});

module.exports = router;
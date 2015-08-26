var router = require('express').Router();

router.get('/status/:code', function (req, res) {
  res.status(req.params.code);
  res.json(req.params.code);
});

router.get('/redirect', function (req, res) {
  res.redirect('/assert/redirected');
});
router.get('/redirected', function (req, res) {
  res.json('ok');
});

router.get('/blank', function (req, res) {
  res.send("");
});

router.get('/form', function (req, res) {
  res.render('assert/form');
});

module.exports = router;
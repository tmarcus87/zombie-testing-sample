var router = require('express').Router();

router.get('/1', function (req, res) {
  res.render('resources/1');
});

router.get('/2', function (req, res) {
  res.json({ ok: true });
});


module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const random = Math.floor(Math.random() * (152))
  res.render('pokemon', { title: `${random} | PokeData`});
});

router.get('/:id', function(req, res, next) {
  res.render('pokemon', { title: `${req.params.id} | PokeData`});
})

module.exports = router;

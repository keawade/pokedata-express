var express = require('express');
var router = express.Router();

var {pokemon} = require('../data/pokemon.json');

/* GET home page. */
router.get('/', function (req, res, next) {
  const random = Math.floor(Math.random() * (152));
  const selected = pokemon.find((poke) => (Number(poke.id) === random));
  console.log(selected)
  res.render('pokemon', { selected, pokemon });
});

router.get('/:id', function (req, res, next) {
  const selected = pokemon.find((poke) => (Number(poke.id) === Number(req.params.id)));
  res.render('pokemon', { selected, pokemon });
})

module.exports = router;

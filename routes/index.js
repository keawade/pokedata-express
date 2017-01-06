var express = require('express');
var router = express.Router();

var {pokemon} = require('../data/pokemon.json');

/* GET home page. */
router.get('/', function (req, res, next) {
  const random = Math.floor(Math.random() * (152));
  let selected = pokemon.find((poke) => (Number(poke.id) === random));
  selected = calculateStrengths(selected);
  res.render('pokemon', { selected, pokemon });
});

router.get('/:id', function (req, res, next) {
  let selected = pokemon.find((poke) => (Number(poke.id) === Number(req.params.id)));
  selected = calculateStrengths(selected);
  res.render('pokemon', { selected, pokemon });
})

module.exports = router;

const calculateStrengths = (mon) => {
  const { types } = require('../data/types.json');
  const typesKeys = Object.keys(types)
  const strengths = typesKeys.reduce((strengths, type) => {
    strengths[type] = mon.types.reduce((total, givenType) => total * types[type][givenType.toLowerCase()], 1)
    return strengths
  }, {})

  mon.weaknesses = Object.keys(strengths).filter((key) => (strengths[key] >= 2));
  mon.resistances = Object.keys(strengths).filter((key) => (strengths[key] == 0.5 || strengths[key] == 0.25));
  mon.immunities = Object.keys(strengths).filter((key) => (strengths[key] == 0));
  return mon;
}

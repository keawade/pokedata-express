var express = require('express');
var router = express.Router();

var {pokemon} = require('../data/pokemon.json');

/* GET home page. */
router.get('/', function (req, res, next) {
  const random = Math.floor(Math.random() * (152));
  const selected = pokemon.find((poke) => (Number(poke.id) === random));
  const strengths = calculateStrengths(selected.types)
  selected.weaknesses = Object.keys(strengths).filter((key) => (strengths[key] >= 2));
  selected.resistances = Object.keys(strengths).filter((key) => (strengths[key] == 0.5 || strengths[key] == 0.25));
  selected.immunities = Object.keys(strengths).filter((key) => (strengths[key] == 0));
  console.log(selected)
  res.render('pokemon', { selected, pokemon });
});

router.get('/:id', function (req, res, next) {
  const selected = pokemon.find((poke) => (Number(poke.id) === Number(req.params.id)));
  const strengths = calculateStrengths(selected.types)
  selected.weaknesses = Object.keys(strengths).filter((key) => (strengths[key] >= 2));
  selected.resistances = Object.keys(strengths).filter((key) => (strengths[key] == 0.5 || strengths[key] == 0.25));
  selected.immunities = Object.keys(strengths).filter((key) => (strengths[key] == 0));
  console.log(selected)
  res.render('pokemon', { selected, pokemon });
})

module.exports = router;

const { types } = require('../data/types.json');

const typesKeys = Object.keys(types)

const calculateStrengths = (givenTypes) => {
  return typesKeys.reduce((strengths, type) => {
    strengths[type] = givenTypes.reduce((total, givenType) => total * types[type][givenType.toLowerCase()], 1)
    return strengths
  }, {})
}

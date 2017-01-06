var express = require('express');
var router = express.Router();

var {pokemon} = require('../data/pokemon.json');

/* GET home page. */
router.get(['/', '/:id'], function (req, res, next) {
  const sess = req.session;
  const id = req.params.id || Math.floor(Math.random() * (152));
  let selected = pokemon.find((poke) => (Number(poke.id) === Number(id)));
  selected = calculateStrengths(selected);

  if (sess.history) {
    sess.history = [selected, ...sess.history];
  } else {
    sess.history = [selected];
  }

  res.render('pokemon', { selected, pokemon, title: `${selected.name} | PokeData`, history: sess.history.slice(1) });
});

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

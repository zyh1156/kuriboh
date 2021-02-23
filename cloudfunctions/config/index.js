
const basics = require('./basics.js');
const effect = require('./effect.js');
const race = require('./race.js');
const rarity = require('./rarity.js');
const type = require('./type.js');

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    basics: basics,
    effect:effect,
    race:race,
    rarity:rarity,
    type:type
  }
}
const level = require('./level.js');
const race = require('./race.js');
const rarity = require('./rarity.js');
const type = require('./type.js');

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    level: level,
    race:race,
    rarity:rarity,
    type:type
  }
}
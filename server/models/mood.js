// Generated by CoffeeScript 1.10.0
var Mood, americano, moment;

americano = require('cozydb');

moment = require('moment');

module.exports = Mood = americano.getModel('Mood', {
  status: {
    type: String
  },
  date: {
    type: Date
  }
});

Mood.getMood = function(day, callback) {
  day = day.format('YYYY-MM-DD');
  return Mood.request('byDay', {
    key: day
  }, function(err, moods) {
    if (err) {
      return callback(err);
    } else if (moods.length !== 0) {
      return callback(null, moods[0]);
    } else {
      return callback();
    }
  });
};
'use strict';

var yql = require('yql');
var _ = require('underscore');
var express = require('express');
var app = express();

var standings = [];
var lastRetrieved = null;
var statement = 'select * from data.html.cssselect where url="http://perfectgolfstore.nl/leaderboard-cat-2/" and css="table > tbody > tr"';

var server = app.listen(3100, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

app.get('/golftotaal', function (req, res) {
  if (lastRetrieved === null || !sameDay(new Date(), lastRetrieved)) {
    lastRetrieved = new Date();
    standings = [];
    new yql.exec(statement, function (response) {
      console.log(response);
      _.each(response.query.results, function (tables) {
        _.each(tables, function (rows) {
          _.each(rows, playerRowParser);
        });
      });
      standings = _.groupBy(standings, function(player) {return player.rounds});
      res.send(standings);

      console.log(standings);
    });
  } else {
    res.send(standings);
  }
});


var sameDay = function (first, second) {
  return (first.getDay() === second.getDay() && first.getMonth() === second.getMonth() && first.getYear() === second.getYear());
};

var playerRowParser = function (row) {
  console.log(row);
  if (row.hasOwnProperty('td')) {
    var totalRounds = _.reduce(
      row.td,
      function(rounds, score, index) {
        if (index > 1 && index < (row.td.length - 1)) {
          if (!_.isNull(score)) {
            console.log(score);
            rounds.push(score);
          } else {
            rounds.push('no show');
          }
        }
        return rounds;
      },
      []);
    var totalScore = row.td[row.td.length - 1];
    var playedRounds = _.filter(totalRounds, function(field) {return field !== 'no show'});

    standings.push({
      player: row.td[1],
      rounds: playedRounds.length,
      scores: totalRounds,
      score: totalScore,
      average: totalScore/playedRounds.length});
  }
};


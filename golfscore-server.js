import yql from 'yql';
import _ from 'lodash';
import express from 'express';

const app = express();

const server = app.listen(3100,  () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

let standings = [];
let lastRetrieved = null;

const statement = 'select * from data.html.cssselect where url="http://perfectgolfstore.nl/leaderboard-cat-2/" and css="table > tbody > tr"';

app.get('/golftotaal', (req, res) => {
  if (lastRetrieved === null || !sameDay(new Date(), lastRetrieved)) {
    lastRetrieved = new Date();
    standings = [];
    new yql.exec(statement, (response) => {
      _.each(response.query.results, (tables) => {
        _.each(tables, (rows) => {
          _.each(rows, playerRowParser);
        });
      });
      standings = _.groupBy(standings, (player) => player.rounds);
      res.send(standings);
      console.log(standings);
    });
  } else {
    res.send(standings);
  }
});

const sameDay = (first, second) => first.getDay() === second.getDay() && first.getMonth() === second.getMonth() && first.getYear() === second.getYear();

const playerRowParser = (row) => {
  if (row.hasOwnProperty('td')) {
    let totalRounds = _.reduce(row.td, (rounds, score, index) => {
        if (index > 1 && index < (row.td.length - 1)) {
          if (!_.isNull(score)) {
            rounds.push(score);
          } else {
            rounds.push('no show');
          }
        }
        return rounds;
      },
      []);
    let totalScore = row.td[row.td.length - 1];
    let playedRounds = _.filter(totalRounds, field => field !== 'no show');

    standings.push({
      player: row.td[1],
      rounds: playedRounds.length,
      scores: totalRounds,
      score: totalScore,
      average: totalScore/playedRounds.length});
  }
};





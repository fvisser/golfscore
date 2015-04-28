'use strict';

var http = require('http');

var options = {
  'host': 'perfectgolfstore.nl',
  'path': '/leaderboard-cat-2/',
  'method': 'GET'
};

http.get(options, function (result) {
  console.log(options.host + ':' + result.statusCode);
  var page = '';
  result.on('data', function (chunk) {
    page += chunk;
  });

  result.on('end', function () {
    console.log(page);
  });
  
  
})



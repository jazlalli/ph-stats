var pg = require('pg');
var api = {};
var queries = {
	daysofweek: [
		'SELECT to_json(array_agg(r)) FROM (',
			'SELECT AVG(votes_count), dayofweek',
			'FROM (',
				'SELECT votes_count, EXTRACT(DOW FROM created_at) as dayofweek',
				'FROM posts',
			') as a',
			'GROUP BY dayofweek',
			'ORDER BY dayofweek ASC, AVG(votes_count) DESC',
		') as r'
	],
	daysofmonth: [
		'SELECT to_json(array_agg(r)) FROM (',
			'SELECT AVG(votes_count), dayofmonth',
			'FROM (',
				'SELECT votes_count, EXTRACT(DAY FROM created_at) as dayofmonth',
				'FROM posts',
			') as a',
			'GROUP BY dayofmonth',
			'ORDER BY dayofmonth ASC, AVG(votes_count) DESC',
		') as r'
	],
	monthsofyear: [
		'SELECT to_json(array_agg(r)) FROM (',
			'SELECT AVG(votes_count), month',
			'FROM (',
				'SELECT votes_count, EXTRACT(MONTH FROM created_at) as month',
				'FROM posts',
			') as a',
			'GROUP BY month',
			'ORDER BY month ASC, AVG(votes_count) DESC',
		') as r'
	],
	topvoters: [
		'SELECT to_json(array_agg(r)) FROM (',
			'SELECT user_id, users.image, user_username, COUNT(votes.id)',
			'FROM votes',
				'INNER JOIN users ON votes.user_id = users.id',
			'GROUP BY user_id, user_username, users.image',
			'ORDER BY COUNT(votes.id) DESC',
			'LIMIT 10',
		') as r'
	],
	topmakers: [
		'SELECT to_json(array_agg(r)) FROM (',
			'SELECT username, image, maker_of_count',
			'FROM users',
			'ORDER BY maker_of_count DESC',
			'LIMIT 10',
		') as r'
	]
};

var connString = "postgres://localhost/ph";

pg.connect(connString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  api.getAvgVotesByDay = function (callback) {
  	client.query(queries.daysofweek.join('\n'), function(err, result) {
	    done();

	    if(err) {
	      callback(err);
	    } else {
	    	callback(null, result.rows[0].to_json);
	    }
	  });
  }

  api.getAvgVotesByDate = function (callback) {
  	client.query(queries.daysofmonth.join('\n'), function(err, result) {
	    done();

	    if(err) {
	      callback(err);
	    } else {
	    	callback(null, result.rows[0].to_json);
	    }
	  });
  }

  api.getAvgVotesByMonth = function (callback) {
  	client.query(queries.monthsofyear.join('\n'), function(err, result) {
	    done();

	    if(err) {
	      callback(err);
	    } else {
	    	callback(null, result.rows[0].to_json);
	    }
	  });
  }

  api.getTopVoters = function (callback) {
  	client.query(queries.topvoters.join('\n'), function(err, result) {
	    done();

	    if(err) {
	      callback(err);
	    } else {
	    	callback(null, result.rows[0].to_json);
	    }
	  });
  }

  api.getTopMakers = function (callback) {
  	client.query(queries.topmakers.join('\n'), function(err, result) {
	    done();

	    if(err) {
	      callback(err);
	    } else {
	    	callback(null, result.rows[0].to_json);
	    }
	  });
  }

});

module.exports = api;
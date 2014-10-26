var PORT = process.env.PORT || 3232;
var async = require('async');
var dal = require('./data/adapter');
var express = require('express'),
		exphbs = require('express-handlebars');

var userData = {};
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/topusers', function (req, res) {

  if (userData.topmakers && userData.topvoters) {
  	res.render('topusers', {data: userData});
  } else {
	  async.parallel([
	  	function (callback) {
	  		dal.getTopVoters(function (err, voters) {
	  			callback(null, voters);
	  		});
	  	},
	  	function (callback) {
	  		dal.getTopMakers(function (err, makers) {
	  			callback(null, makers);
	  		});
	  	}
		], function (err, results) {
			userData.topvoters = results[0];
			userData.topmakers = results[1];
			res.render('topusers', {data: userData});
		});
  }
});

app.get('/api/data/daysofweek', function (req, res) {
	dal.getAvgVotesByDay(function (err, result) {
		res.json({data: result});
	});
});

app.get('/api/data/daysofmonth', function (req, res) {
	dal.getAvgVotesByDate(function (err, result) {
		res.json({data: result});
	});
});

app.get('/api/data/month', function (req, res) {
	dal.getAvgVotesByMonth(function (err, result) {
		res.json({data: result});
	});
});

app.get('/api/data/topmakers', function (req, res) {
	console.log('getting top makers');

	dal.getTopMakers(function (err, result) {
		res.json({data: result});
	});
});

app.get('/api/data/topvoters', function (req, res) {
	console.log('getting top voters');

	dal.getTopVoters(function (err, result) {
		res.json({data: result});
	});
});

app.listen(PORT, function () {
	console.log('server running on port', PORT);
});
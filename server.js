var PORT = process.env.PORT || 3232;
var data = require('./data');
var express = require('express'),
		exphbs = require('express-handlebars');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { data: data });
});

app.get('/api/data/daysofweek', function (req, res) {
	res.json({data: data.daysofweek});
});

app.get('/api/data/daysofyear', function (req, res) {
	res.json({data: data.daysofyear});
});

app.get('/api/data/month', function (req, res) {
	res.json({data: data.month});
});

app.get('/api/data/topmakers', function (req, res) {
	res.json({data: data.topmakers});
});

app.get('/api/data/topvoters', function (req, res) {
	res.json({data: data.topvoters.slice(0, 10)});
});

app.listen(PORT, function () {
	console.log('server running on port', PORT);
});